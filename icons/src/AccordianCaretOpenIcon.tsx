import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgAccordianCaretOpenIcon = (
  props: SVGProps<SVGSVGElement>,
  ref: Ref<SVGSVGElement>
) => (
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
      d="M7.575 9.631 4.913 6.97a.6.6 0 0 1 .424-1.024h5.325a.6.6 0 0 1 .424 1.024L8.424 9.63a.6.6 0 0 1-.849 0"
    />
  </svg>
);
const AccordianCaretOpenIcon = forwardRef(SvgAccordianCaretOpenIcon) as any;
export default AccordianCaretOpenIcon;
