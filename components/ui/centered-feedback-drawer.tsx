"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AnimatePresence, motion } from "framer-motion";
import { Star, X } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { colors, cardCSS, accentCSS, buttonStyles } from "@/lib/themes";

export default function CenteredFeedbackDrawer() {
  const { theme } = useTheme();
  const cc = cardCSS[theme];
  const pal = colors[theme];
  const ac = accentCSS[theme];
  const bs = buttonStyles[theme];

  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState<"idle" | "success" | "error">("idle");

  const canSubmit = useMemo(() => {
    return Boolean(name.trim() && email.trim() && message.trim() && rating > 0);
  }, [name, email, message, rating]);

  const resetForm = () => {
    setRating(0);
    setName("");
    setEmail("");
    setMessage("");
  };

  const resetStatus = () => {
    setStatusMessage("");
    setStatusType("idle");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!canSubmit || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    resetStatus();

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          rating,
          message,
          source: "contact-page-feedback-drawer",
        }),
      });

      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(data.message || "Failed to send feedback. Please try again.");
      }

      setStatusType("success");
      setStatusMessage("Thanks for sharing your feedback. Your message was sent successfully.");
      resetForm();
    } catch (error) {
      setStatusType("error");
      setStatusMessage(
        error instanceof Error
          ? error.message
          : "Could not send feedback right now. Please try again shortly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeDrawer = () => {
    setIsOpen(false);
    resetStatus();
  };

  return (
    <>
      <Button 
        className="mt-16 flex justify-center border py-6 align-center content-center text-center w-full sm:w-auto"
        style={{
          backgroundColor: ac.primary,
          color: theme === "industrial" ? "#000000" : theme === "dark-horse" ? "#000000" : pal.bg,
          borderColor: ac.primary,
        }}
        onClick={() => setIsOpen(true)}
      >
        Give Feedback
      </Button>

      <AnimatePresence>
        {isOpen ? (
          <>
            <motion.div
              className="fixed inset-0 z-[10000]"
              onClick={closeDrawer}
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              style={{
                backgroundColor: `${pal.bg}cc`,
              }}
            />
            <motion.div
              className="fixed inset-x-0 bottom-0 z-[10001] mt-24 flex max-h-[90vh] flex-col border md:left-1/2 md:w-full md:max-w-2xl md:-translate-x-1/2"
              style={{
                backgroundColor: cc.bg,
                borderColor: cc.border,
                borderRadius: theme === "industrial" ? 0 : theme === "glass" ? "24px" : "16px",
              }}
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <div 
                className="mx-auto mt-3 h-1.5 w-16 rounded-full"
                style={{ backgroundColor: ac.line }}
              />
              <div className="absolute right-4 top-4">
                <Button
                  variant="ghost"
                  size="icon"
                  type="button"
                  aria-label="Close feedback drawer"
                  onClick={closeDrawer}
                  style={{ color: pal.text }}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="overflow-y-auto">
        <form
          onSubmit={handleSubmit}
          className="mx-auto flex w-full max-w-2xl flex-col items-center justify-center px-4 py-8 text-center"
        >
          <div className="max-w-md space-y-2 p-4 text-center sm:text-left">
            <h2 className="text-xl font-bold" style={{ color: pal.heading }}>
              We Value Your Feedback
            </h2>
            <p className="text-sm" style={{ color: pal.textSecondary }}>
              Help us improve by sharing your thoughts.
            </p>
          </div>

          <div className="mt-4 w-full max-w-md space-y-4">
            <div className="grid gap-2 text-left">
              <Label htmlFor="feedback-name" style={{ color: pal.text }}>Name</Label>
              <Input
                id="feedback-name"
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                style={{
                  backgroundColor: cc.bg,
                  borderColor: cc.border,
                  color: pal.text,
                }}
              />
            </div>

            <div className="grid gap-2 text-left">
              <Label htmlFor="feedback-email" style={{ color: pal.text }}>Email</Label>
              <Input
                id="feedback-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                style={{
                  backgroundColor: cc.bg,
                  borderColor: cc.border,
                  color: pal.text,
                }}
              />
            </div>

            <div className="grid gap-2 text-left">
              <Label style={{ color: pal.text }}>Rate your experience</Label>
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                  >
                    <Star
                      className={`h-6 w-6 cursor-pointer ${
                        rating >= star ? "fill-current" : ""
                      }`}
                      style={{
                        color: rating >= star ? ac.primary : ac.line,
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-2 text-left">
              <Label htmlFor="feedback-message" style={{ color: pal.text }}>Message</Label>
              <Textarea
                id="feedback-message"
                placeholder="Tell us about your experience..."
                className="min-h-[100px]"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                required
                style={{
                  backgroundColor: cc.bg,
                  borderColor: cc.border,
                  color: pal.text,
                }}
              />
            </div>
          </div>

          {statusMessage ? (
            <p
              className={`mt-4 w-full max-w-md text-left text-sm`}
              style={{
                color: statusType === "error" ? "#EF4444" : "#10B981",
              }}
            >
              {statusMessage}
            </p>
          ) : null}

          <div className="mt-6 flex w-full max-w-md flex-col gap-3 p-4 sm:flex-row ">
            <Button 
              className="w-full"
              type="submit" 
              disabled={!canSubmit || isSubmitting}
              style={{
                backgroundColor: ac.primary,
                color: theme === "industrial" ? "#000000" : theme === "dark-horse" ? "#000000" : pal.bg,
                borderColor: ac.primary,
              }}
            >
              {isSubmitting ? "Sending..." : "Submit Feedback"}
            </Button>
            <Button
              variant="outline"
              className="w-full"
              type="button"
              onClick={() => {
                resetForm();
                resetStatus();
                setIsOpen(false);
              }}
              style={{
                borderColor: cc.border,
                color: pal.text,
                backgroundColor: "transparent",
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
