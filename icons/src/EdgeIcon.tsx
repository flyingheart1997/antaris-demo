import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgEdgeIcon = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
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
      d="M4 10.4q.001-.109.055-.2H2.401v.8a.8.8 0 0 0 .8.8H4zm1.2-3V6.2a.4.4 0 1 1 .8 0v1.2a.4.4 0 0 1-.8 0m2.4 0V6.2a.4.4 0 0 1 .8 0v1.2a.4.4 0 1 1-.8 0m2.4 0V6.2a.4.4 0 0 1 .8 0v1.2a.4.4 0 0 1-.8 0M13.6 5a.8.8 0 0 0-.8-.8H3.2a.8.8 0 0 0-.8.8v.371a1.6 1.6 0 0 1 .543 2.376c-.145.193-.33.349-.542.46V9.4H13.6V8.228a1.6 1.6 0 0 1-.542-.458 1.602 1.602 0 0 1 .542-2.377zm-8.8 6.8h1.6v-1.4q.002-.109.054-.2H4.745a.4.4 0 0 1 .055.2zm2.4 0h1.6v-1.4a.4.4 0 0 1 .055-.2h-1.71a.4.4 0 0 1 .054.2zm2.4 0h1.6v-1.4c0-.072.021-.14.055-.2h-1.71a.4.4 0 0 1 .055.2zm2.4 0h.8a.8.8 0 0 0 .8-.8v-.8h-1.654a.4.4 0 0 1 .054.2zm2.4-6.14a.4.4 0 0 1-.286.384.8.8 0 0 0-.416 1.246c.104.138.25.24.416.288a.4.4 0 0 1 .287.384V11a1.6 1.6 0 0 1-1.6 1.6H3.2A1.6 1.6 0 0 1 1.6 11V7.94a.4.4 0 0 1 .287-.384.8.8 0 0 0 0-1.534.4.4 0 0 1-.287-.384V5a1.6 1.6 0 0 1 1.6-1.6h9.6A1.6 1.6 0 0 1 14.4 5z"
    />
  </svg>
);
const EdgeIcon = forwardRef(SvgEdgeIcon) as any;
export default EdgeIcon;
