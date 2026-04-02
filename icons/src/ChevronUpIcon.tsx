import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgChevronUpIcon = (
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
      d="M7.736 4.599a.48.48 0 0 1 .604.061l6 6a.481.481 0 0 1-.68.68L8 5.68l-5.66 5.66a.481.481 0 0 1-.68-.68l6-6z"
    />
  </svg>
);
const ChevronUpIcon = forwardRef(SvgChevronUpIcon) as any;
export default ChevronUpIcon;
