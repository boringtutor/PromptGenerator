import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";
import { Button, ButtonProps } from "./button";
import { cn } from "@/lib/utils";
import { useSpinDelay } from "spin-delay";
import { ButtonStatus } from "@/lib/types";
import { CheckCircle2, Wand2 } from "lucide-react";

export const StatusButton = React.forwardRef<
  HTMLButtonElement,
  ButtonProps & {
    status: ButtonStatus;
    message?: string | null;
    spinDelay?: Parameters<typeof useSpinDelay>[1];
  }
>(({ message, status, className, children, spinDelay, ...props }, ref) => {
  const delayedPending = useSpinDelay(status === "pending", {
    delay: 400,
    minDuration: 300,
    ...spinDelay,
  });
  const companion = {
    pending: delayedPending ? (
      <Wand2 className="mr-2 h-4 w-4 animate-spin" />
    ) : null,
    success: (
      <>
        <CheckCircle2 className="mr-2 h-4 w-4" />
      </>
    ),
    error: (
      <div className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-destructive">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="text-destructive-foreground"
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </div>
    ),
    idle: <Wand2 className="mr-2 h-4 w-4" />,
  }[status];

  return (
    <Button
      ref={ref}
      className={cn("flex justify-center gap-4", className)}
      {...props}
    >
      <div>{children}</div>
      {message ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>{companion}</TooltipTrigger>
            <TooltipContent>{message}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        companion
      )}
    </Button>
  );
});
StatusButton.displayName = "Button";
