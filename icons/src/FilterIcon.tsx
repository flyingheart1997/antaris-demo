import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgFilterIcon = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
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
      d="M10 12.267a.4.4 0 1 1 0 .8H6a.4.4 0 0 1 0-.8zM12 7.6a.4.4 0 0 1 0 .8H4a.4.4 0 1 1 0-.8zm2.666-4.667a.4.4 0 0 1 0 .8H1.333a.4.4 0 0 1 0-.8z"
    />
  </svg>
);
const FilterIcon = forwardRef(SvgFilterIcon) as any;
export default FilterIcon;
