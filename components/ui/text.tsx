'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion, useAnimationControls } from 'framer-motion';
import { cn } from '@/lib/utils';

const textVariants = cva(
  'inline-flex items-center transition-colors',
  {
    variants: {
      type: {
        heading: 'font-heading',
        body: 'font-body',
        code: 'font-code',
      },
      size: {
        xxxl: 'text-xxxl leading-xxxl tracking-xxxl',
        xxl: 'text-xxl leading-xxl tracking-xxl',
        xl: 'text-xl leading-xl tracking-xl',
        lg: 'text-lg leading-lg tracking-lg',
        md: 'text-md leading-md tracking-md',
        sm: 'text-sm leading-sm tracking-sm',
        xs: 'text-xs leading-xs tracking-xs',
      },
      weight: {
        light: 'font-light',
        regular: 'font-regular',
        medium: 'font-medium',
        bold: 'font-bold',
        italic: 'font-italic italic',
      },
      color: {
        primary: 'text-text-primary',
        secondary: 'text-text-secondary',
        disabled: 'text-text-disabled',
        selected: 'text-text-selected',
        focus: 'text-text-focus',
        info: 'text-text-info',
        warning: 'text-text-warning',
        error: 'text-text-error',
      },
      capsOn: {
        true: 'uppercase',
        false: '',
      },
    },
    defaultVariants: {
      type: 'body',
      size: 'md',
      weight: 'regular',
      color: 'primary',
      capsOn: false,
    },
  }
);

export interface TextProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'color'>,
    VariantProps<typeof textVariants> {
  asChild?: boolean;
  mask?: boolean;
  maskAlignment?: 'left' | 'center' | 'right' | 'top' | 'bottom';
}

/**
 * Text component for Antaris Design System.
 * Implements high-fidelity typography with optional mask revelation interaction.
 */
const Text = React.forwardRef<HTMLSpanElement, TextProps>(
  ({ className, type, size, weight, color, capsOn, asChild = false, mask = false, maskAlignment = 'left', children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'span';
    const controls = useAnimationControls();
    const containerRef = React.useRef<HTMLSpanElement>(null);
    const contentRef = React.useRef<HTMLSpanElement>(null);

    const [isHovered, setIsHovered] = React.useState(false);
    const [hasOverflow, setHasOverflow] = React.useState(false);

    // Dynamic overflow detection
    React.useEffect(() => {
      const checkOverflow = () => {
        if (containerRef.current && contentRef.current) {
          setHasOverflow(contentRef.current.scrollWidth > containerRef.current.offsetWidth);
        }
      };

      // Initial check and resize observer
      checkOverflow();
      const observer = new ResizeObserver(checkOverflow);
      if (containerRef.current) observer.observe(containerRef.current);
      
      return () => observer.disconnect();
    }, [children, size]);

    // Mask revelation interaction (Hover > 1s)
    React.useEffect(() => {
      if (!mask || !isHovered || !containerRef.current || !contentRef.current || !hasOverflow) {
        controls.stop();
        controls.set({ x: 0 });
        return;
      }

      let active = true;
      const timeout = setTimeout(async () => {
        if (!active || !containerRef.current || !contentRef.current) return;

        const containerWidth = containerRef.current.offsetWidth;
        const contentWidth = contentRef.current.scrollWidth;
        const scrollDistance = contentWidth - containerWidth;
        
        if (scrollDistance <= 0) return;
        
        const duration = scrollDistance / 40; // 40px/s speed

        const runAnimation = async () => {
          if (!active) return;

          // Scroll to end
          await controls.start({
            x: -scrollDistance,
            transition: { duration, ease: 'linear' },
          });

          if (!active) return;
          await new Promise((resolve) => setTimeout(resolve, 1000)); // Hold at end

          if (!active) return;
          await controls.set({ x: 0 }); // Snap to start

          if (!active) return;
          await new Promise((resolve) => setTimeout(resolve, 500)); // Delay before repeat

          if (active) runAnimation();
        };

        runAnimation();
      }, 1000); // 1s hover delay requirement

      return () => {
        active = false;
        clearTimeout(timeout);
        controls.stop();
        controls.set({ x: 0 });
      };
    }, [mask, isHovered, controls, hasOverflow]);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    const combinedRef = (node: HTMLSpanElement | null) => {
      if (!node) return;
      // @ts-ignore
      containerRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        // @ts-ignore
        ref.current = node;
      }
    };

    if (mask) {
      return (
        <span
          ref={combinedRef}
          className={cn(
            'relative overflow-hidden whitespace-nowrap block w-full group',
            // Visual gradient mask when truncated and not hovered
            hasOverflow && !isHovered && maskAlignment === 'left' && "mask-fade",
            hasOverflow && !isHovered && maskAlignment === 'right' && "mask-fade-left",
            maskAlignment === 'center' && 'text-center',
            maskAlignment === 'right' && 'text-right',
            className
          )}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          {...(props as any)}
        >
          <motion.span
            animate={controls}
            initial={{ x: 0 }}
            ref={contentRef}
            className={cn(
                'inline-block',
                textVariants({ type, size, weight, color, capsOn })
            )}
          >
            {children}
          </motion.span>
        </span>
      );
    }

    return (
      <Comp
        ref={ref}
        className={cn(textVariants({ type, size, weight, color, capsOn, className }))}
        {...(props as any)}
      >
        {children}
      </Comp>
    );
  }
);
Text.displayName = 'Text';

export { Text, textVariants };
