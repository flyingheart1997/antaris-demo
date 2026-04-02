import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgChevronRightIcon = (
  props: SVGProps<SVGSVGElement>,
  ref: Ref<SVGSVGElement>
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 16 16"
    className="antaris-icon"
    ref={ref}
    {...props}
  >
    <path
      fill="currentColor"
      d="M10.66 1.66a.481.481 0 0 1 .68.68L5.68 8l5.66 5.66a.481.481 0 0 1-.68.68l-6-6a.48.48 0 0 1 0-.68z"
    />
  </svg>
);
const ChevronRightIcon = forwardRef(SvgChevronRightIcon) as any;
export default ChevronRightIcon;
