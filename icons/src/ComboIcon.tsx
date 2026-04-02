import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgComboIcon = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
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
      d="M11.717 9.717a.4.4 0 0 1 .566.566l-4 4a.4.4 0 0 1-.566 0l-4-4a.4.4 0 0 1 .566-.566L8 13.434zM8 1.6a.4.4 0 0 1 .283.117l4 4a.4.4 0 0 1-.566.566L8 2.566 4.283 6.283a.4.4 0 0 1-.566-.566l4-4 .061-.05A.4.4 0 0 1 8 1.6"
    />
  </svg>
);
const ComboIcon = forwardRef(SvgComboIcon) as any;
export default ComboIcon;
