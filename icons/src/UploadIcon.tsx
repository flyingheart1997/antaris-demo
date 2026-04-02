import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgUploadIcon = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
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
      d="M1.6 12.667V10a.4.4 0 0 1 .8 0v2.667a.93.93 0 0 0 .933.933h9.334a.93.93 0 0 0 .933-.933V10a.4.4 0 0 1 .8 0v2.667a1.734 1.734 0 0 1-1.733 1.733H3.333A1.734 1.734 0 0 1 1.6 12.667M7.6 10V2.966l-2.65 2.65a.4.4 0 0 1-.566-.565l3.333-3.334.063-.051a.4.4 0 0 1 .503.05l3.333 3.335a.4.4 0 1 1-.565.565L8.4 2.966V10a.4.4 0 0 1-.801 0"
    />
  </svg>
);
const UploadIcon = forwardRef(SvgUploadIcon) as any;
export default UploadIcon;
