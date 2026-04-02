import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgCheckIcon = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
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
      d="M11.926 3.363a.4.4 0 1 1 .648.467l-5.62 7.807a.4.4 0 0 1-.605.052l-3.38-3.322a.4.4 0 1 1 .561-.57l3.046 2.994z"
    />
  </svg>
);
const CheckIcon = forwardRef(SvgCheckIcon) as any;
export default CheckIcon;
