import { test, expect } from "@playwright/test";

test("hero intro waits for loader, and sticky reveal finishes inside the viewport", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
  await page.goto("/");
  await expect(page.locator(".loader-overlay")).toHaveCount(0);
  await expect(page.locator(".hero-char").first()).toHaveClass(/visible/);
  const scene = page.locator("[data-hero-scene]");
  expect((await scene.boundingBox())!.height).toBeLessThanOrEqual(900);
  const initialMedia = await page.locator("[data-hero-media]").boundingBox();
  await page.locator("[data-hero-scroll]").evaluate(element => {
    window.scrollTo({ top: element.getBoundingClientRect().top + window.scrollY + element.clientHeight - window.innerHeight - 1, behavior: "instant" });
  });
  await expect.poll(() => page.locator("[data-hero-media]").evaluate(element => Number(getComputedStyle(element).clipPath.match(/[\d.]+/)?.[0]))).toBeLessThan(0.1);
  const finalMedia = await page.locator("[data-hero-media]").boundingBox();
  expect(finalMedia!.width).toBeCloseTo(initialMedia!.width, 0);
  expect(finalMedia!.height).toBeCloseTo(initialMedia!.height, 0);
  expect(finalMedia!.y).toBeGreaterThanOrEqual(0);
  expect(finalMedia!.y + finalMedia!.height).toBeLessThanOrEqual(901);
  expect(errors).toEqual([]);
});

test("route veil waits for a delayed destination, then releases navigation", async ({ page }) => {
  let release!: () => void;
  const gate = new Promise<void>(resolve => { release = resolve; });
  await page.route("**/about?*", async route => {
    await gate;
    await route.continue();
  });
  await page.goto("/");
  await expect(page.locator(".loader-overlay")).toHaveCount(0);
  await page.locator('header a[href="/about"]').click();
  const veil = page.locator("[data-page-transition]");
  await expect(veil).toBeVisible();
  // The previous implementation revealed after a fixed ~1s even with the route blocked.
  await page.waitForTimeout(1500);
  await expect(veil).toBeVisible();
  release();
  await expect(page).toHaveURL(/\/about$/);
  await expect(veil).toBeHidden();
  await page.locator('header a[href="/works"]').click();
  await expect(page).toHaveURL(/\/works$/);
  await expect(veil).toBeHidden();
});

test("event previews finish after rapid selection and support keyboard input", async ({ page }) => {
  await page.goto("/");
  const rows = page.locator('#events li[role="button"]');
  await rows.nth(1).hover();
  await rows.nth(3).hover();
  await expect(rows.nth(3)).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator('#events svg[role="img"]')).toHaveAttribute("aria-label", (await rows.nth(3).locator("h3").textContent())!);
  await rows.nth(2).focus();
  await page.keyboard.press("Enter");
  await expect(rows.nth(2)).toHaveAttribute("aria-pressed", "true");
  const clip = await page.locator("#events g[clip-path]").getAttribute("clip-path");
  const clipId = clip!.slice(5, -1);
  await expect.poll(() => page.locator(`#${clipId} .path`).first().evaluate(element => getComputedStyle(element).transform)).toMatch(/matrix\(1, 0, 0, 1, 0, 0\)|none/);
});

test("continuous decoration pauses when outside the viewport", async ({ page }) => {
  await page.goto("/");
  const marquee = page.locator(".marquee-inner").first();
  await expect(marquee).toHaveCSS("animation-play-state", "paused");
  await marquee.scrollIntoViewIfNeeded();
  await expect(marquee).toHaveCSS("animation-play-state", "running");
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await expect(marquee).toHaveCSS("animation-play-state", "paused");
});

test("mobile layout stays within the viewport and uses a readable experience list", async ({ browser }) => {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  await page.goto("http://127.0.0.1:3100/");
  await expect(page.locator(".loader-overlay")).toHaveCount(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  expect((await page.locator("[data-hero-scene]").boundingBox())!.height).toBeLessThanOrEqual(844);
  await expect(page.locator("[data-experience-track]")).toBeHidden();
  await page.locator('header a[href="/works"]').click();
  await expect(page).toHaveURL(/\/works$/);
  await expect(page.locator("[data-page-transition]")).toBeHidden();
  await page.close();
});

test("reduced motion removes sticky choreography and continuous decoration", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".loader-overlay")).toHaveCount(0);
  await expect(page.locator("[data-hero-scene]")).toHaveCSS("position", "relative");
  await expect(page.locator("[data-hero-media]")).toHaveCSS("clip-path", "none");
  await expect(page.locator("[data-experience-track]")).toBeVisible();
  await expect(page.locator(".rotating-stamp")).toHaveCSS("animation-name", "none");
  await expect(page.locator(".marquee-inner").first()).toHaveCSS("animation-name", "none");
  await page.locator('header a[href="/works"]').click();
  await expect(page).toHaveURL(/\/works$/);
  await expect(page.locator("[data-page-transition]")).toBeHidden();
});

test("project grid settles after rapid filtering and restores all cards", async ({ page }) => {
  await page.goto("/works");
  await expect(page.locator(".loader-overlay")).toHaveCount(0);
  await page.getByRole("button", { name: "GRID", exact: true }).click();
  const cards = page.locator("[data-project-card]");
  await expect(cards).toHaveCount(8);
  await page.getByRole("button", { name: /^AGENTIC AI/ }).click();
  await page.getByRole("button", { name: /^WEB DEV/ }).click();
  await expect(cards).toHaveCount(2);
  await expect.poll(() => cards.evaluateAll(elements => elements.every(element => getComputedStyle(element).opacity === "1" && getComputedStyle(element).transform === "none"))).toBe(true);
  await page.getByRole("button", { name: /^ALL/ }).click();
  await expect(cards).toHaveCount(8);
  await expect.poll(() => cards.evaluateAll(elements => elements.every(element => getComputedStyle(element).opacity === "1" && getComputedStyle(element).transform === "none"))).toBe(true);
});
