import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgCommsIcon = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
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
      d="M2.616 6.27a.4.4 0 0 1 .334.114L6 9.434l1.718-1.717a.4.4 0 0 1 .565.566L6.565 10l3.051 3.05a.4.4 0 0 1-.08.629 5.274 5.274 0 0 1-7.214-7.214l.055-.073a.4.4 0 0 1 .239-.121m.157 1.068a4.474 4.474 0 0 0 5.888 5.889zm8.16 1.329a3.6 3.6 0 0 0-3.6-3.6.4.4 0 1 1 0-.8 4.4 4.4 0 0 1 4.4 4.4.4.4 0 1 1-.8 0m2.667 0A6.27 6.27 0 0 0 7.334 2.4a.4.4 0 0 1 0-.8A7.07 7.07 0 0 1 14.4 8.667a.4.4 0 0 1-.8 0"
    />
  </svg>
);
const CommsIcon = forwardRef(SvgCommsIcon) as any;
export default CommsIcon;
