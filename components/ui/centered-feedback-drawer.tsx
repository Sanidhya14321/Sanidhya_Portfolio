"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useTheme } from "@/contexts/ThemeContext";
import { cardCSS, colors } from "@/lib/themes";
import { AnimatePresence, motion } from "framer-motion";
import { Star, X } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";

export default function CenteredFeedbackDrawer() {
  const { theme } = useTheme();
  const cc = cardCSS[theme];
  const palette = colors[theme];

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
        className="mt-16 flex justify-center border py-6 rounded-xl align-center content-center text-center"
        style={{
          backgroundColor: `${palette.accent}20`,
          borderColor: palette.accent,
          color: palette.text,
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
              style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
            />
            <motion.div
              className="fixed inset-x-0 bottom-0 z-[10001] mt-24 flex max-h-[90vh] flex-col md:left-1/2 md:w-full md:max-w-2xl md:-translate-x-1/2"
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              style={{
                backgroundColor: cc.bg,
                borderColor: cc.border,
                borderWidth: "1px",
                borderRadius: theme === "industrial" ? 0 : theme === "glass" ? 24 : 16,
              }}
            >
              <div className="mx-auto mt-3 h-1.5 w-16 rounded-full" style={{ backgroundColor: `${palette.text}30` }} />
              <div className="absolute right-4 top-4">
                <Button
                  variant="ghost"
                  size="icon"
                  type="button"
                  aria-label="Close feedback drawer"
                  onClick={closeDrawer}
                  style={{ color: palette.text }}
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
                    <h2 className="text-xl font-bold" style={{ color: palette.heading }}>
                      We Value Your Feedback
                    </h2>
                    <p className="text-sm" style={{ color: palette.textSecondary }}>
                      Help us improve by sharing your thoughts.
                    </p>
                  </div>

                  <div className="mt-4 w-full max-w-md space-y-4">
                    <div className="grid gap-2 text-left">
                      <Label htmlFor="feedback-name" style={{ color: palette.text }}>Name</Label>
                      <Input
                        id="feedback-name"
                        type="text"
                        placeholder="Your name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        required
                        style={{
                          backgroundColor: `${palette.accent}10`,
                          borderColor: cc.border,
                          color: palette.text,
                        }}
                      />
                    </div>

                    <div className="grid gap-2 text-left">
                      <Label htmlFor="feedback-email" style={{ color: palette.text }}>Email</Label>
                      <Input
                        id="feedback-email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                        style={{
                          backgroundColor: `${palette.accent}10`,
                          borderColor: cc.border,
                          color: palette.text,
                        }}
                      />
                    </div>

                    <div className="grid gap-2 text-left">
                      <Label style={{ color: palette.text }}>Rate your experience</Label>
                      <div className="flex justify-center gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                          >
                            <Star
                              className="h-6 w-6 cursor-pointer transition-colors"
                              style={{
                                fill: rating >= star ? palette.accent : "none",
                                color: rating >= star ? palette.accent : palette.textSecondary,
                              }}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid gap-2 text-left">
                      <Label htmlFor="feedback-message" style={{ color: palette.text }}>Message</Label>
                      <Textarea
                        id="feedback-message"
                        placeholder="Tell us about your experience..."
                        className="min-h-[100px]"
                        value={message}
                        onChange={(event) => setMessage(event.target.value)}
                        required
                        style={{
                          backgroundColor: `${palette.accent}10`,
                          borderColor: cc.border,
                          color: palette.text,
                        }}
                      />
                    </div>
                  </div>

                  {statusMessage ? (
                    <p
                      className="mt-4 w-full max-w-md text-left text-sm"
                      style={{
                        color: statusType === "error" ? "#ef4444" : "#22c55e",
                      }}
                    >
                      {statusMessage}
                    </p>
                  ) : null}

                  <div className="mt-6 flex w-full max-w-md flex-col gap-3 p-4 sm:flex-row">
                    <Button
                      className="w-full"
                      type="submit"
                      disabled={!canSubmit || isSubmitting}
                      style={{
                        backgroundColor: palette.accent,
                        color: palette.bg,
                        borderColor: palette.accent,
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
                        color: palette.text,
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
