import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgLoadComponentsIcon = (
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
      d="M13.192 8a4.613 4.613 0 0 0-5.805-4.455.4.4 0 0 1-.207-.773 5.412 5.412 0 1 1 0 10.456.4.4 0 1 1 .207-.773A4.613 4.613 0 0 0 13.192 8M1.83 3.023a.4.4 0 0 1 .426.054l5.539 4.616a.4.4 0 0 1 0 .615l-5.54 4.615a.4.4 0 0 1-.655-.308v-9.23a.4.4 0 0 1 .23-.362m.57 8.737L6.913 8 2.4 4.237z"
    />
  </svg>
);
const LoadComponentsIcon = forwardRef(SvgLoadComponentsIcon) as any;
export default LoadComponentsIcon;
