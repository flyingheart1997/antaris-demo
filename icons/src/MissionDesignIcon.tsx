import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgMissionDesignIcon = (
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
      d="M13.6 13.143a.457.457 0 1 0-.915 0 .457.457 0 0 0 .915 0M7.02 7.363A8.9 8.9 0 0 1 3.257 8.39v3.561c.372.125.667.42.792.792h7.902c.125-.373.42-.667.792-.792v-.139a5.54 5.54 0 0 1-4.034-2.2zm5.722-2.382a8.1 8.1 0 0 0-4.09 1.35l-.863.575-.075.048 1.634 2.178a4.74 4.74 0 0 0 3.394 1.878zM3.257 7.59a8.1 8.1 0 0 0 3.273-.872 4.74 4.74 0 0 0-3.273-1.728zm.792-4.332c-.125.372-.42.666-.792.79v.14A5.54 5.54 0 0 1 7.23 6.314l.116-.073.863-.576a8.9 8.9 0 0 1 4.533-1.484v-.133a1.26 1.26 0 0 1-.792-.791zM2.4 13.143a.457.457 0 1 0 .914 0 .457.457 0 0 0-.914 0M13.6 2.857a.457.457 0 1 0-.914 0 .457.457 0 0 0 .914 0m-11.2 0a.457.457 0 1 0 .915 0 .457.457 0 0 0-.915 0m12 0c0 .555-.36 1.024-.857 1.19v7.904a1.257 1.257 0 1 1-1.59 1.592H4.047a1.257 1.257 0 1 1-1.591-1.592V4.048a1.257 1.257 0 1 1 1.59-1.591h7.905a1.257 1.257 0 0 1 2.448.4"
    />
  </svg>
);
const MissionDesignIcon = forwardRef(SvgMissionDesignIcon) as any;
export default MissionDesignIcon;
