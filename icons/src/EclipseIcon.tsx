import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgEclipseIcon = (
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
      d="M8 2.4a.401.401 0 0 1 .282.683c-1.259 1.26-1.258 3.375.001 4.634 1.26 1.26 3.374 1.26 4.633 0A.401.401 0 0 1 13.6 8 5.601 5.601 0 0 1 2.4 8 5.6 5.6 0 0 1 8 2.4M3.2 8a4.8 4.8 0 0 0 9.517.878c-1.564.94-3.66.743-4.999-.595S6.18 4.845 7.12 3.28A4.8 4.8 0 0 0 3.2 7.999"
    />
  </svg>
);
const EclipseIcon = forwardRef(SvgEclipseIcon) as any;
export default EclipseIcon;
