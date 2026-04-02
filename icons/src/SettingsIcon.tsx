import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgSettingsIcon = (
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
      d="M12.148 13.266a.4.4 0 0 1-.8 0v-4.37a.4.4 0 0 1 .8 0zM12.152 4.085a.4.4 0 0 1-.801 0V2.4a.4.4 0 0 1 .8 0z"
    />
    <path
      fill="currentColor"
      d="M11.751 8.367a1.849 1.849 0 1 0 0-3.697 1.849 1.849 0 0 0 0 3.697m0 .8a2.648 2.648 0 1 1 0-5.296 2.648 2.648 0 0 1 0 5.296M3.849 2.398a.4.4 0 0 1 .8 0v4.37a.4.4 0 0 1-.8 0zM3.849 11.579a.4.4 0 0 1 .8 0v1.686a.4.4 0 0 1-.8 0z"
    />
    <path
      fill="currentColor"
      d="M4.249 7.297a1.849 1.849 0 1 0 0 3.697 1.849 1.849 0 0 0 0-3.697m0-.8a2.648 2.648 0 1 1 0 5.296 2.648 2.648 0 0 1 0-5.296"
    />
  </svg>
);
const SettingsIcon = forwardRef(SvgSettingsIcon) as any;
export default SettingsIcon;
