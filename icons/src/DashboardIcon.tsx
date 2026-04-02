import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgDashboardIcon = (
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
      d="M5.646 13.859v.8H2.852v-.8zm7.507 0v.8H10.36v-.8zm.7-.7v-2.794a.7.7 0 0 0-.7-.7H10.36a.7.7 0 0 0-.7.7v2.794a.7.7 0 0 0 .7.7v.8l-.153-.008a1.5 1.5 0 0 1-1.339-1.339l-.008-.153v-2.794a1.5 1.5 0 0 1 1.347-1.492l.153-.008h2.794l.154.008a1.5 1.5 0 0 1 1.346 1.492v2.794l-.007.153a1.5 1.5 0 0 1-1.34 1.339l-.153.008v-.8a.7.7 0 0 0 .7-.7m-7.507 0V2.828a.7.7 0 0 0-.7-.7H2.852a.7.7 0 0 0-.7.7v10.33a.7.7 0 0 0 .7.7v.8l-.154-.007a1.5 1.5 0 0 1-1.339-1.339l-.007-.153V2.828a1.5 1.5 0 0 1 1.5-1.5h2.794a1.5 1.5 0 0 1 1.5 1.5v10.33l-.008.154a1.5 1.5 0 0 1-1.34 1.339l-.152.008v-.8a.7.7 0 0 0 .7-.7m6.807-6.838v.8H10.36v-.8zm.7-.7V2.828a.7.7 0 0 0-.7-.7H10.36a.7.7 0 0 0-.7.7V5.62a.7.7 0 0 0 .7.7v.8l-.153-.008a1.5 1.5 0 0 1-1.339-1.34l-.008-.152V2.828a1.5 1.5 0 0 1 1.347-1.493l.153-.007h2.794l.154.007a1.5 1.5 0 0 1 1.346 1.493V5.62l-.007.153a1.5 1.5 0 0 1-1.34 1.339l-.153.008v-.8a.7.7 0 0 0 .7-.7"
    />
  </svg>
);
const DashboardIcon = forwardRef(SvgDashboardIcon) as any;
export default DashboardIcon;
