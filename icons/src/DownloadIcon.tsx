import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgDownloadIcon = (
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
      d="M1.6 12.667V10a.4.4 0 0 1 .8 0v2.667a.93.93 0 0 0 .933.933h9.334a.933.933 0 0 0 .933-.933V10a.4.4 0 0 1 .8 0v2.667a1.734 1.734 0 0 1-1.733 1.733H3.333A1.734 1.734 0 0 1 1.6 12.667M7.6 2a.4.4 0 0 1 .8 0v7.033l2.65-2.65a.4.4 0 0 1 .566.566l-3.333 3.334a.4.4 0 0 1-.566 0L4.384 6.95a.4.4 0 0 1 .565-.565l2.65 2.65z"
    />
  </svg>
);
const DownloadIcon = forwardRef(SvgDownloadIcon) as any;
export default DownloadIcon;
