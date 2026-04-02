import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgBatteryIcon = (
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
      d="M11.2 6.2a.8.8 0 0 0-.8-.8H3.2a.8.8 0 0 0-.8.8v3.6a.8.8 0 0 0 .8.8h7.2a.8.8 0 0 0 .8-.8zM4 8.6V7.4a.4.4 0 1 1 .8 0v1.2a.4.4 0 0 1-.8 0m2.4 0V7.4a.4.4 0 0 1 .8 0v1.2a.4.4 0 0 1-.8 0m2.4 0V7.4a.4.4 0 0 1 .8 0v1.2a.4.4 0 0 1-.8 0m4.8 0V7.4a.4.4 0 0 1 .8 0v1.2a.4.4 0 0 1-.8 0M12 9.8a1.6 1.6 0 0 1-1.6 1.6H3.2c-.883 0-1.6-.716-1.6-1.6V6.2c0-.883.717-1.6 1.6-1.6h7.2A1.6 1.6 0 0 1 12 6.2z"
    />
  </svg>
);
const BatteryIcon = forwardRef(SvgBatteryIcon) as any;
export default BatteryIcon;
