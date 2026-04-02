import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgTempIcon = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
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
      d="M8.8 3.202a.8.8 0 0 0-.8-.8.8.8 0 0 0-.8.8v6.322a.4.4 0 0 1-.2.346 2 2 0 1 0 2 0 .4.4 0 0 1-.2-.346zm.8 6.101A2.801 2.801 0 0 1 8 14.402a2.8 2.8 0 0 1-1.6-5.098V3.202A1.6 1.6 0 0 1 8 1.6a1.6 1.6 0 0 1 1.6 1.6z"
    />
  </svg>
);
const TempIcon = forwardRef(SvgTempIcon) as any;
export default TempIcon;
