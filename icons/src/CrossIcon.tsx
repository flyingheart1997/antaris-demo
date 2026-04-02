import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgCrossIcon = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
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
      d="M11.888 3.403a.5.5 0 1 1 .707.707L8.705 8l3.89 3.892a.501.501 0 0 1-.707.708L7.997 8.708 4.11 12.596a.5.5 0 0 1-.707-.707L7.29 8 3.403 4.114a.501.501 0 0 1 .707-.708l3.888 3.888z"
    />
  </svg>
);
const CrossIcon = forwardRef(SvgCrossIcon) as any;
export default CrossIcon;
