"use client";
import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function Accordion(props: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root {...props} />;
}

export function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      className={cn(
        "border-b last:border-none",
        "first:rounded-t-md last:rounded-b-md overflow-hidden", // ✅ Rounded corners only on first & last
        className
      )}
      {...props}
    />
  );
}

export function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex w-full">
      <AccordionPrimitive.Trigger
        className={cn(
          "flex flex-row-reverse flex-1 justify-between items-center py-4 px-6 text-lg font-medium text-white bg-gray-800 transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-primary/40",
          "[&[data-state=open]>svg]:rotate-180",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon className="h-5 w-5 text-white transition-transform duration-300" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

export function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      className="overflow-hidden data-[state=open]:animate-slide-down data-[state=closed]:animate-slide-up"
      {...props}
    >
      <div
        className={cn(
          "px-6 pb-4 text-white bg-gray-600 leading-relaxed flex flex-row-reverse", // ✅ Darker content area
          className
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
}
