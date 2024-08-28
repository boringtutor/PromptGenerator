import React from "react";
import { Button, ButtonProps } from "./button";
import { ButtonStatus } from "../../lib/types";
import { cn } from "../../lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

export const CopyToClipBoard = React.forwardRef<
  HTMLButtonElement,
  ButtonProps & {
    message?: string | null;
  }
>(({ message, className, children, ...props }, ref) => {
  //   const companion = () => {
  //     return (
  //       <>
  //         <div className="inline-flex h-6 w-6 items-center justify-center">
  //           <svg
  //             xmlns="http://www.w3.org/2000/svg"
  //             width="16"
  //             height="16"
  //             viewBox="0 0 24 24"
  //             fill="none"
  //             stroke="currentColor"
  //             strokeWidth="2"
  //             strokeLinecap="round"
  //             strokeLinejoin="round"
  //             className="mr-2"
  //           >
  //             <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
  //             <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
  //           </svg>
  //         </div>
  //       </>
  //     );
  //   };
  const companion = {
    success: (
      <div className="inline-flex h-6 w-6 items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2"
        >
          <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
        </svg>
      </div>
    ),
  };

  return (
    <Button
      ref={ref}
      className={cn("flex justify-center gap-2", className)}
      {...props}
    >
      <div>{children}</div>
      {message ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>{companion.success}</TooltipTrigger>
            <>Copy To Clipboard</>
          </Tooltip>
        </TooltipProvider>
      ) : (
        companion.success
      )}
    </Button>
  );
});

CopyToClipBoard.displayName = "Button";
