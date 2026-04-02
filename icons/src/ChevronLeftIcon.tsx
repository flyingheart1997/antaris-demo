import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgChevronLeftIcon = (
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
      d="M4.66 1.66a.48.48 0 0 1 .68 0l6 6a.48.48 0 0 1 0 .68l-6 6a.481.481 0 0 1-.68-.68L10.32 8 4.66 2.34a.48.48 0 0 1 0-.68"
    />
  </svg>
);
const ChevronLeftIcon = forwardRef(SvgChevronLeftIcon) as any;
export default ChevronLeftIcon;
