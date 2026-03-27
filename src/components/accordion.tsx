"use client";

import React, { useState } from "react";
import { useHaptic } from "@/hooks/use-haptic";

interface AccordionProps {
  question: string;
  answer: string;
}

function Accordion({ question, answer }: AccordionProps) {
  const [open, setOpen] = useState(false);
  const haptic = useHaptic();

  const handleToggle = () => {
    haptic("select");
    setOpen(!open);
  };

  return (
    <div
      className="my-2 flex flex-col border border-border bg-background rounded-md overflow-hidden transition-colors data-[state=open]:border-primary/50"
      data-state={open ? "open" : "closed"}
    >
      <button
        onClick={handleToggle}
        className="flex justify-between items-center w-full px-4 py-3 font-semibold hover:bg-muted/50 transition-colors"
      >
        <span className="text-foreground text-left">{question}</span>
        <span
          className="text-xl leading-none text-muted-foreground transition-transform duration-normal data-[state=open]:rotate-45"
          data-state={open ? "open" : "closed"}
        >
          +
        </span>
      </button>

      <div
        className={`grid overflow-hidden transition-all duration-normal ease-out-expo bg-muted/20 text-muted-foreground ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-4 py-4 text-left leading-relaxed text-sm">
            {answer}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Accordion;
