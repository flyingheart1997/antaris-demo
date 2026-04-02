import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgAccordianCaretCloseIcon = (
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
      d="m9.63 8.424-2.662 2.662a.6.6 0 0 1-1.024-.424V5.338a.6.6 0 0 1 1.024-.425l2.663 2.663a.6.6 0 0 1 0 .848"
    />
  </svg>
);
const AccordianCaretCloseIcon = forwardRef(SvgAccordianCaretCloseIcon) as any;
export default AccordianCaretCloseIcon;
