import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgSunlitIcon = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
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
      d="M7.6 14v-1.2a.4.4 0 0 1 .8 0V14a.4.4 0 0 1-.8 0m-3.278-2.887a.401.401 0 0 1 .566.566l-.846.846a.4.4 0 0 1-.566-.566zm6.792 0a.4.4 0 0 1 .565 0l.846.846a.4.4 0 1 1-.566.566l-.845-.846a.4.4 0 0 1 0-.566M10 8a2 2 0 1 0-4 0 2 2 0 0 0 4 0m-6.8-.4a.4.4 0 0 1 0 .8H2a.4.4 0 1 1 0-.8zm10.8 0a.4.4 0 0 1 0 .8h-1.2a.4.4 0 1 1 0-.8zM3.476 3.475a.4.4 0 0 1 .566 0l.846.847a.4.4 0 0 1-.566.565l-.846-.846a.4.4 0 0 1 0-.566m8.484 0a.4.4 0 0 1 .565.566l-.846.846a.4.4 0 0 1-.565-.565zM7.6 3.201V2a.4.4 0 0 1 .8 0v1.2a.4.4 0 0 1-.8 0M10.8 8a2.8 2.8 0 1 1-5.6-.002A2.8 2.8 0 0 1 10.8 8"
    />
  </svg>
);
const SunlitIcon = forwardRef(SvgSunlitIcon) as any;
export default SunlitIcon;
