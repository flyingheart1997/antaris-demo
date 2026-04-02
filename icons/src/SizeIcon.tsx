import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgSizeIcon = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
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
      d="M2.6 1a.4.4 0 0 1 .8 0v11.033l5.317-5.316a.4.4 0 0 1 .566.566L3.967 12.6H15a.4.4 0 0 1 0 .8H3a.4.4 0 0 1-.4-.4z"
    />
  </svg>
);
const SizeIcon = forwardRef(SvgSizeIcon) as any;
export default SizeIcon;
