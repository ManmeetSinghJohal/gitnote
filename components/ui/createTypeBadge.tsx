import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        workflow:
          "border-transparent bg-primary1-500/10 text-primary1-500 shadow hover:bg-primary/80",
        component:
          "border-transparent bg-purple-500/10 text-purple-500 shadow hover:bg-primary/80",
        knowledge:
          "border-transparent bg-green-500/10 text-green-500 shadow hover:bg-primary/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "workflow",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function CreateTypeBadge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { CreateTypeBadge, badgeVariants };
