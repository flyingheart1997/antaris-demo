import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgEyeOpenIcon = (
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
      d="M8 3.4a6.85 6.85 0 0 1 6.332 4.238l.006.014c.083.225.083.472 0 .696l-.006.013a6.85 6.85 0 0 1-6.078 4.233L8 12.6a6.85 6.85 0 0 1-6.332-4.238l-.006-.013a1 1 0 0 1 0-.696l.006-.014A6.85 6.85 0 0 1 8 3.4m0 .8a6.05 6.05 0 0 0-5.589 3.734.2.2 0 0 0 0 .132A6.05 6.05 0 0 0 8 11.8l.225-.004a6.05 6.05 0 0 0 5.363-3.73.2.2 0 0 0 0-.132A6.05 6.05 0 0 0 8 4.201M8.8 8a.8.8 0 1 0-1.6 0 .8.8 0 0 0 1.6 0m.8 0a1.6 1.6 0 1 1-3.2 0 1.6 1.6 0 0 1 3.2 0"
    />
  </svg>
);
const EyeOpenIcon = forwardRef(SvgEyeOpenIcon) as any;
export default EyeOpenIcon;
