import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgCustomIcon = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
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
      d="M13.592 5.212a.93.93 0 0 0-.457-.685L8.468 1.861h-.001a.93.93 0 0 0-.934 0L2.864 4.527a.93.93 0 0 0-.465.807v5.333a.93.93 0 0 0 .464.805h.001l4.667 2.667.001.001a.93.93 0 0 0 .934 0l4.668-2.668a.93.93 0 0 0 .465-.805V5.334zM9.2 8A1.2 1.2 0 1 0 6.8 8 1.2 1.2 0 0 0 9.2 8m.8 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4.4 2.667-.015.226a1.74 1.74 0 0 1-.852 1.274l-4.668 2.667v-.001a1.73 1.73 0 0 1-1.73 0l-4.667-2.665-.001-.001a1.73 1.73 0 0 1-.852-1.274l-.015-.226V5.333a1.73 1.73 0 0 1 .867-1.5l4.668-2.667a1.73 1.73 0 0 1 1.73 0l4.667 2.667h.001a1.73 1.73 0 0 1 .867 1.5z"
    />
  </svg>
);
const CustomIcon = forwardRef(SvgCustomIcon) as any;
export default CustomIcon;
