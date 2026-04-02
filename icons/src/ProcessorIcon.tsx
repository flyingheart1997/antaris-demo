import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgProcessorIcon = (
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
      d="M12.4 4.4a.8.8 0 0 0-.8-.8H4.4a.8.8 0 0 0-.8.8v7.2a.8.8 0 0 0 .8.8h7.2a.8.8 0 0 0 .8-.8zm-3 2.4a.2.2 0 0 0-.2-.2H6.8a.2.2 0 0 0-.2.2v2.4c0 .11.09.2.2.2h2.4a.2.2 0 0 0 .2-.2zm.8 2.4a1 1 0 0 1-1 1H6.8a1 1 0 0 1-1-1V6.8a1 1 0 0 1 1-1h2.4a1 1 0 0 1 1 1zm3-3.4h.8a.4.4 0 0 1 0 .8h-.8v2.8h.8a.4.4 0 1 1 0 .8h-.8v1.4a1.6 1.6 0 0 1-1.6 1.6h-1.4v.8a.4.4 0 0 1-.8 0v-.8H6.6v.8a.4.4 0 1 1-.8 0v-.8H4.4a1.6 1.6 0 0 1-1.6-1.6v-1.4H2a.4.4 0 0 1 0-.8h.8V6.6H2a.4.4 0 1 1 0-.8h.8V4.4a1.6 1.6 0 0 1 1.6-1.6h1.4V2a.4.4 0 0 1 .8 0v.8h2.8V2a.4.4 0 0 1 .8 0v.8h1.4a1.6 1.6 0 0 1 1.6 1.6z"
    />
  </svg>
);
const ProcessorIcon = forwardRef(SvgProcessorIcon) as any;
export default ProcessorIcon;
