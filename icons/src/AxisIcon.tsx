import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgAxisIcon = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
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
      d="M2.933 2a.4.4 0 0 1 .8 0v10.267H14a.4.4 0 0 1 0 .8H3.333a.4.4 0 0 1-.4-.4z"
    />
    <path
      fill="currentColor"
      d="M7.05 8.383a.4.4 0 0 1 .567.567l-4 4a.4.4 0 0 1-.567-.566zM3.114 1.666a.4.4 0 0 1 .503.05l2 2a.4.4 0 0 1-.567.567L3.333 2.566 1.617 4.283a.4.4 0 0 1-.567-.566l2-2zM11.717 10.384a.4.4 0 0 1 .566 0l2 2a.4.4 0 0 1 0 .566l-2 2a.4.4 0 0 1-.566-.566l1.717-1.717-1.717-1.717a.4.4 0 0 1 0-.566"
    />
  </svg>
);
const AxisIcon = forwardRef(SvgAxisIcon) as any;
export default AxisIcon;
