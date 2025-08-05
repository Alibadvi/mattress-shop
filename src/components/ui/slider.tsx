"use client";
import * as React from "react";

interface SliderProps {
  value: number[];
  min: number;
  max: number;
  step: number;
  onValueChange: (value: number[]) => void;
}

export function Slider({ value, min, max, step, onValueChange }: SliderProps) {
  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value[0]}
      onChange={(e) => onValueChange([Number(e.target.value), value[1]])}
      className="w-full accent-primary"
    />
  );
}
