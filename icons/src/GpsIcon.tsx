import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgGpsIcon = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
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
      d="M7.6 14v-1.418A4.6 4.6 0 0 1 3.419 8.4H2a.4.4 0 0 1 0-.8h1.419a4.6 4.6 0 0 1 4.18-4.182V2A.4.4 0 0 1 8.4 2v1.418A4.6 4.6 0 0 1 12.581 7.6H14a.4.4 0 1 1 0 .8h-1.419a4.6 4.6 0 0 1-4.18 4.182V14a.4.4 0 0 1-.801 0M8 4.2a3.8 3.8 0 1 0 0 7.6 3.8 3.8 0 0 0 0-7.6M9.4 8a1.4 1.4 0 1 0-2.8 0 1.4 1.4 0 0 0 2.8 0m.8 0a2.2 2.2 0 1 1-4.4 0 2.2 2.2 0 0 1 4.4 0"
    />
  </svg>
);
const GpsIcon = forwardRef(SvgGpsIcon) as any;
export default GpsIcon;
