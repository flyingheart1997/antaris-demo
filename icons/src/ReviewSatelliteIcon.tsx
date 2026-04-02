import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgReviewSatelliteIcon = (
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
      d="M2.35 14V2a.4.4 0 0 1 .8 0v12a.4.4 0 0 1-.8 0M5.576 1.64A.4.4 0 0 1 6 1.688l7.5 6a.4.4 0 0 1 0 .625l-7.5 6A.401.401 0 0 1 5.35 14V2a.4.4 0 0 1 .226-.36m.574 11.528L12.61 8 6.15 2.832z"
    />
  </svg>
);
const ReviewSatelliteIcon = forwardRef(SvgReviewSatelliteIcon) as any;
export default ReviewSatelliteIcon;
