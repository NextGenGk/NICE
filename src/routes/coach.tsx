import { createFileRoute, Link } from "@tanstack/react-router";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useEffect, useState } from "react";
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputFooter,
  PromptInputSubmit,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { Button } from "@/components/ui/button";
import { Sparkles, MessageSquareHeart } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/coach")({
  head: () => ({
    meta: [
      { title: "AI Insurance & Claims Coach · NICE Raipur" },
      {
        name: "description",
        content:
          "Instant answers on vehicle accidents, claim disputes, zero depreciation, commercial fleet cover, and hospital cashless approvals in India.",
      },
      { property: "og:title", content: "NICE AI Claims & Insurance Coach" },
      {
        property: "og:description",
        content: "24/7 AI-powered claims advocacy and policy intelligence tailored for Indian policyholders.",
      },
    ],
  }),
  component: CoachPage,
});

const SUGGESTIONS = [
  "My vehicle met with an accident. What should I do first before the surveyor arrives?",
  "What is the difference between Zero-Depreciation and Comprehensive insurance?",
  "Why did the TPA deduct 30% from my hospital cashless claim?",
  "Which add-ons are mandatory for a commercial tipper or truck in Chhattisgarh?",
  "Can an insurer deny my claim if I notified them 48 hours after the accident?",
  "How to protect my 50% No Claim Bonus (NCB) during policy renewal?",
];

function CoachPage() {
  const [text, setText] = useState("");
  const [transport] = useState(() => new DefaultChatTransport({ api: "/api/chat" }));
  const { messages, sendMessage, status } = useChat({
    id: "nice-coach",
    transport,
    onError: (e) => toast.error(e.message ?? "Coach is unavailable. Please try again."),
  });

  useEffect(() => {
    // Re-focus textarea on load
    const t = document.querySelector<HTMLTextAreaElement>("textarea[data-coach]");
    t?.focus();
  }, []);

  const isLoading = status === "submitted" || status === "streaming";

  const send = (value: string) => {
    const v = value.trim();
    if (!v || isLoading) return;
    sendMessage({ text: v });
    setText("");
  };

  return (
    <div className="mx-auto flex h-[calc(100vh-4rem)] max-w-4xl flex-col px-4 sm:px-6">
      <div className="border-b border-border py-4">
        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-accent">
          <Sparkles className="size-3.5" /> NICE AI Claims Desk · 24/7 Guidance
        </div>
        <h1 className="mt-1 font-display text-2xl text-foreground sm:text-3xl">
          Ask anything about insurance policies & claims in India.
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Powered by NICE Claims Intelligence. <em>Guidance in accordance with IRDAI guidelines.</em>{" "}
          <Link to="/book" className="text-accent underline-offset-2 hover:underline">
            Request on-ground claim assistance in Raipur
          </Link>{" "}
          whenever needed.
        </p>
      </div>

      <Conversation className="flex-1">
        <ConversationContent className="space-y-4">
          {messages.length === 0 ? (
            <ConversationEmptyState
              icon={<MessageSquareHeart className="size-10 text-accent" />}
              title="Your AI Financial Coach"
              description="Try one of these or type your own question."
            >
              <div className="mt-5 grid w-full max-w-2xl gap-2 sm:grid-cols-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="rounded-lg border border-border bg-card p-3 text-left text-sm text-foreground transition-colors hover:border-accent hover:bg-accent/5"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </ConversationEmptyState>
          ) : (
            messages.map((m: UIMessage) => (
              <Message key={m.id} from={m.role as "user" | "assistant"}>
                {m.role === "user" ? (
                  <MessageContent className="group-[.is-user]:bg-foreground group-[.is-user]:text-background">
                    {m.parts.map((p, i) =>
                      p.type === "text" ? <span key={i}>{p.text}</span> : null,
                    )}
                  </MessageContent>
                ) : (
                  <MessageContent>
                    <MessageResponse>
                      {m.parts.map((p) => (p.type === "text" ? p.text : "")).join("")}
                    </MessageResponse>
                  </MessageContent>
                )}
              </Message>
            ))
          )}
          {status === "submitted" && (
            <Message from="assistant">
              <MessageContent>
                <Shimmer>Thinking…</Shimmer>
              </MessageContent>
            </Message>
          )}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      <div className="pb-4 pt-2">
        <PromptInput
          onSubmit={(message) => {
            send(message.text ?? text);
          }}
        >
          <PromptInputTextarea
            data-coach
            placeholder="Ask about SIPs, insurance, retirement, taxes…"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <PromptInputFooter className="justify-between">
            <span className="text-xs text-muted-foreground">
              Enter to send · Shift+Enter for newline
            </span>
            <PromptInputSubmit status={status} disabled={isLoading || !text.trim()} />
          </PromptInputFooter>
        </PromptInput>
        <div className="mt-3 text-center">
          <Button asChild variant="ghost" size="sm">
            <Link to="/book">Ready for a personalised plan? Book a 30-min call →</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
