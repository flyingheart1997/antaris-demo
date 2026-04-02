import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgSolarGenerationIcon = (
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
      d="M11.598 7.6q.134 0 .257.052l.08.04.073.05a.7.7 0 0 1 .123.126l.048.074 2.354 4.238a.666.666 0 0 1-.58.989H3.726a.666.666 0 0 1-.581-.989L5.5 7.942l.048-.074q.08-.107.196-.176l.08-.04A.7.7 0 0 1 6.08 7.6zm-.319 4.769h2.444l-.439-.79h-2.18zm-4.06 0h3.241l-.175-.79H7.394zm-3.263 0h2.443l.176-.79h-2.18zm6.97-1.59h1.914l-.439-.79H10.75zm-3.355 0h2.536l-.175-.79H7.747zm-2.732 0h1.914l.176-.79H5.277zm.877-6.121a3.58 3.58 0 0 1 3.945.97.4.4 0 0 1-.598.53 2.779 2.779 0 0 0-4.857 1.843c0 .308.052.613.154.904a.4.4 0 1 1-.755.266 3.5 3.5 0 0 1-.186-.873L3.406 8a3.58 3.58 0 0 1 2.31-3.342m4.856 4.531h1.384l-.438-.789h-1.12zm-2.647 0h1.829L9.578 8.4H8.101zm-2.202 0h1.383l.175-.789h-1.12zM2.747 7.6a.4.4 0 0 1 0 .8h-.53a.4.4 0 1 1 0-.8zm.246-3.59a.4.4 0 0 1 .566 0l.529.53a.4.4 0 1 1-.566.565l-.529-.53a.4.4 0 0 1 0-.566m3.592-.248v-.53a.4.4 0 0 1 .8 0v.53a.4.4 0 0 1-.8 0"
    />
  </svg>
);
const SolarGenerationIcon = forwardRef(SvgSolarGenerationIcon) as any;
export default SolarGenerationIcon;
