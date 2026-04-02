import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgEpsIcon = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
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
      d="M1.6 9.8V6.2a1.6 1.6 0 0 1 1.6-1.6h1.2a.4.4 0 0 1 0 .8H3.2a.8.8 0 0 0-.8.8v3.6a.8.8 0 0 0 .8.8h.6a.4.4 0 1 1 0 .8h-.6a1.6 1.6 0 0 1-1.6-1.6m9.6 0V6.2a.8.8 0 0 0-.8-.8h-.6a.4.4 0 0 1 0-.8h.6A1.6 1.6 0 0 1 12 6.2v3.6a1.6 1.6 0 0 1-1.6 1.6H9.2a.4.4 0 0 1 0-.8h1.2a.8.8 0 0 0 .8-.8M7.058 4.794a.4.4 0 0 1 .685.412L6.307 7.601H8a.4.4 0 0 1 .343.605l-1.8 3a.4.4 0 0 1-.686-.412L7.293 8.4H5.601a.401.401 0 0 1-.344-.606zM13.6 8.6V7.4a.4.4 0 0 1 .8 0v1.2a.4.4 0 0 1-.8 0"
    />
  </svg>
);
const EpsIcon = forwardRef(SvgEpsIcon) as any;
export default EpsIcon;
