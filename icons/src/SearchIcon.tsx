import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgSearchIcon = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
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
      d="M12.067 7.133a4.933 4.933 0 1 0-9.867.001 4.933 4.933 0 0 0 9.867 0m.8 0a5.7 5.7 0 0 1-1.408 3.76l2.624 2.624a.401.401 0 0 1-.566.566l-2.623-2.624a5.734 5.734 0 1 1 1.973-4.326"
    />
  </svg>
);
const SearchIcon = forwardRef(SvgSearchIcon) as any;
export default SearchIcon;
