"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerTrigger,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";

export default function CenteredFeedbackDrawer() {
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

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="default">Give Feedback</Button>
      </DrawerTrigger>

      <DrawerContent>
        <form
          onSubmit={handleSubmit}
          className="mx-auto flex w-full max-w-2xl flex-col items-center justify-center px-4 py-8 text-center"
        >
          <DrawerHeader className="max-w-md space-y-2">
            <DrawerTitle className="text-xl font-bold">
              We Value Your Feedback
            </DrawerTitle>
            <DrawerDescription>
              Help us improve by sharing your thoughts.
            </DrawerDescription>
          </DrawerHeader>

          <div className="mt-4 w-full max-w-md space-y-4">
            <div className="grid gap-2 text-left">
              <Label htmlFor="feedback-name">Name</Label>
              <Input
                id="feedback-name"
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </div>

            <div className="grid gap-2 text-left">
              <Label htmlFor="feedback-email">Email</Label>
              <Input
                id="feedback-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>

            <div className="grid gap-2 text-left">
              <Label>Rate your experience</Label>
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
                        rating >= star
                          ? "fill-yellow-500 text-yellow-500"
                          : "text-gray-400"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-2 text-left">
              <Label htmlFor="feedback-message">Message</Label>
              <Textarea
                id="feedback-message"
                placeholder="Tell us about your experience..."
                className="min-h-[100px]"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                required
              />
            </div>
          </div>

          {statusMessage ? (
            <p
              className={`mt-4 w-full max-w-md text-left text-sm ${
                statusType === "error" ? "text-red-500" : "text-green-500"
              }`}
            >
              {statusMessage}
            </p>
          ) : null}

          <DrawerFooter className="mt-6 flex w-full max-w-md flex-col gap-3 sm:flex-row">
            <Button className="w-full" type="submit" disabled={!canSubmit || isSubmitting}>
              {isSubmitting ? "Sending..." : "Submit Feedback"}
            </Button>
            <DrawerClose asChild>
              <Button
                variant="outline"
                className="w-full"
                type="button"
                onClick={() => {
                  resetForm();
                  resetStatus();
                }}
              >
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
