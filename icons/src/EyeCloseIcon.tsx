import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgEyeCloseIcon = (
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
      d="M13.624 5.68a.4.4 0 0 1 .752.274A6.79 6.79 0 0 1 4.109 9.189a6.8 6.8 0 0 1-2.485-3.235.4.4 0 0 1 .752-.273 5.987 5.987 0 0 0 11.248 0"
    />
  </svg>
);
const EyeCloseIcon = forwardRef(SvgEyeCloseIcon) as any;
export default EyeCloseIcon;
