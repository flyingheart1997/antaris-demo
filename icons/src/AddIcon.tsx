import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgAddIcon = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
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
      d="M7.6 12.666V8.4H3.333a.4.4 0 1 1 0-.8H7.6V3.333a.4.4 0 0 1 .8 0V7.6h4.266a.4.4 0 0 1 0 .8H8.4v4.266a.4.4 0 1 1-.8 0"
    />
  </svg>
);
const AddIcon = forwardRef(SvgAddIcon) as any;
export default AddIcon;
