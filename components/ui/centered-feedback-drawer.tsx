"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AnimatePresence, motion } from "framer-motion";
import { Star, X } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";

export default function CenteredFeedbackDrawer() {
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
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to submit feedback.");
      }

      setStatusType("success");
      setStatusMessage("Thank you! Your feedback has been sent.");
      resetForm();
    } catch (error) {
      setStatusType("error");
      setStatusMessage(
        error instanceof Error ? error.message : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const openDrawer = () => {
    resetStatus();
    setIsOpen(true);
  };

  const closeDrawer = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="my-10 text-center">
        <Button
          onClick={openDrawer}
          className="rounded-xl border border-white/20 bg-white/5 px-6 py-2.5 text-sm font-medium text-white hover:bg-white hover:text-black hover:border-white transition-all shadow-lg"
        >
          Give Feedback
        </Button>
      </div>

      <AnimatePresence>
        {isOpen ? (
          <div className="relative z-[10000]">
            <motion.div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeDrawer}
            />
            <motion.div
              className="fixed inset-x-0 bottom-0 z-[10001] mt-24 flex max-h-[90vh] flex-col md:left-1/2 md:w-full md:max-w-xl md:-translate-x-1/2 rounded-t-3xl md:rounded-3xl border border-white/15 bg-neutral-950/95 backdrop-blur-2xl shadow-2xl p-6 md:p-8"
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mx-auto -mt-2 mb-4 h-1.5 w-12 rounded-full bg-white/20" />
              <div className="absolute right-5 top-5">
                <Button
                  variant="ghost"
                  size="icon"
                  type="button"
                  aria-label="Close feedback drawer"
                  onClick={closeDrawer}
                  className="text-neutral-400 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="overflow-y-auto">
                <form
                  onSubmit={handleSubmit}
                  className="mx-auto flex w-full flex-col items-center justify-center text-center"
                >
                  <div className="space-y-1 mb-6 text-center">
                    <h3 className="text-xl font-bold text-white">
                      We Value Your Feedback
                    </h3>
                    <p className="text-sm text-neutral-400">
                      Share your thoughts or leave a review.
                    </p>
                  </div>

                  <div className="w-full space-y-4">
                    <div className="grid gap-1.5 text-left">
                      <Label htmlFor="feedback-name" className="text-xs font-mono text-neutral-300">Name</Label>
                      <Input
                        id="feedback-name"
                        type="text"
                        placeholder="Your name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        required
                        className="border-white/10 bg-white/5 text-white placeholder:text-neutral-500 focus:border-white"
                      />
                    </div>

                    <div className="grid gap-1.5 text-left">
                      <Label htmlFor="feedback-email" className="text-xs font-mono text-neutral-300">Email</Label>
                      <Input
                        id="feedback-email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                        className="border-white/10 bg-white/5 text-white placeholder:text-neutral-500 focus:border-white"
                      />
                    </div>

                    <div className="grid gap-2 text-left">
                      <Label className="text-xs font-mono text-neutral-300">Rate your experience</Label>
                      <div className="flex justify-center gap-2 py-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                          >
                            <Star
                              className={`h-6 w-6 cursor-pointer transition-colors ${
                                rating >= star ? "fill-white text-white" : "text-neutral-600"
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid gap-1.5 text-left">
                      <Label htmlFor="feedback-message" className="text-xs font-mono text-neutral-300">Message</Label>
                      <Textarea
                        id="feedback-message"
                        placeholder="Your feedback or notes..."
                        value={message}
                        onChange={(event) => setMessage(event.target.value)}
                        required
                        rows={3}
                        className="border-white/10 bg-white/5 text-white placeholder:text-neutral-500 focus:border-white"
                      />
                    </div>

                    {statusMessage ? (
                      <p
                        className={`text-xs ${
                          statusType === "success" ? "text-white" : "text-neutral-400"
                        }`}
                      >
                        {statusMessage}
                      </p>
                    ) : null}

                    <div className="flex justify-end gap-2 pt-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={closeDrawer}
                        className="border-white/10 bg-white/5 text-neutral-300 hover:text-white"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        disabled={!canSubmit || isSubmitting}
                        className="bg-white text-black hover:bg-neutral-200 disabled:opacity-50"
                      >
                        {isSubmitting ? "Submitting..." : "Submit Feedback"}
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </>
  );
}