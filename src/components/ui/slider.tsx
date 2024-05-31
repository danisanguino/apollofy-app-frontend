import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import "./slider.css";
import { cn } from "@/lib/utils";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn("slider1", className)}
    {...props}
  >
    <SliderPrimitive.Track className="slider2">
      <SliderPrimitive.Range className="slider3" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="slider4" />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
