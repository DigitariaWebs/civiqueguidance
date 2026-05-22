"use client";

import React from "react";

type Props = {
  className?: string;
};

/**
 * Trait pinceau rouge marianne avec fort mouvement dynamique et épaisseur affirmée.
 * À placer comme enfant d'un élément `relative inline-block` enveloppant le texte.
 */
export default function BrushUnderline({ className = "" }: Props) {
  return (
    <div
      className={`absolute left-[-2%] bottom-[-18px] w-[104%] h-[32px] pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 400 32"
        width="100%"
        height="100%"
        preserveAspectRatio="none"
      >
        {/* Forme pleine calligraphique avec une forte amplitude de vague et des variations brutes d'épaisseur */}
        <path
          d="M 5,14 
             C 80,26  180,32  280,18
             C 330,11 375,6   395,3 
             C 320,10 240,20  150,22 
             C 80,23  30,18   5,14 Z"
          fill="#E1000F"
          opacity="0.95"
        />
      </svg>
    </div>
  );
}