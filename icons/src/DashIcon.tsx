import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgDashIcon = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
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
    <path fill="currentColor" d="M12 7.6a.4.4 0 0 1 0 .8H4a.4.4 0 0 1 0-.8z" />
  </svg>
);
const DashIcon = forwardRef(SvgDashIcon) as any;
export default DashIcon;
