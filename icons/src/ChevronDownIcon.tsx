import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgChevronDownIcon = (
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
      d="M13.66 4.66a.481.481 0 0 1 .68.68l-6 6a.48.48 0 0 1-.68 0l-6-6a.481.481 0 0 1 .68-.68L8 10.32z"
    />
  </svg>
);
const ChevronDownIcon = forwardRef(SvgChevronDownIcon) as any;
export default ChevronDownIcon;
