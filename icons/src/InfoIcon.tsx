import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgInfoIcon = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
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
      d="M13.6 8A5.6 5.6 0 1 0 2.4 8 5.6 5.6 0 0 0 13.6 8m-6 2.4V8a.4.4 0 0 1 .8 0v2.4a.4.4 0 0 1-.8 0m.407-5.2a.4.4 0 0 1 0 .8H8a.4.4 0 1 1 0-.8zM14.4 8A6.4 6.4 0 1 1 1.6 8 6.4 6.4 0 0 1 14.4 8"
    />
  </svg>
);
const InfoIcon = forwardRef(SvgInfoIcon) as any;
export default InfoIcon;
