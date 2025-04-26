
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // in ms
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number; // in px
  once?: boolean;
}

const ScrollReveal = ({
  children,
  className,
  delay = 0,
  direction = "up",
  distance = 30,
  once = true,
}: ScrollRevealProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("animate-in");
            }, delay);
            
            if (once) {
              observer.unobserve(entry.target);
            }
          } else if (!once) {
            entry.target.classList.remove("animate-in");
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const element = elementRef.current;
    if (element) {
      observer.observe(element);
    }
    
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [delay, once]);
  
  const getTransformValue = () => {
    switch (direction) {
      case "up":
        return `translateY(${distance}px)`;
      case "down":
        return `translateY(-${distance}px)`;
      case "left":
        return `translateX(${distance}px)`;
      case "right":
        return `translateX(-${distance}px)`;
      default:
        return "none";
    }
  };
  
  return (
    <div
      ref={elementRef}
      className={cn(
        "transition-all duration-700 ease-out opacity-0",
        className
      )}
      style={{ transform: getTransformValue() }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
