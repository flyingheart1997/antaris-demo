import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgUsersIcon = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
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
      d="M8.076 6.968A2.315 2.315 0 0 0 5.754 4.66a2.315 2.315 0 0 0-2.322 2.308c0 1.193.911 2.177 2.084 2.295l.238.012.237-.012a2.314 2.314 0 0 0 2.085-2.295m4.474 0a2.316 2.316 0 0 0-2.323-2.308c-.265 0-.52.043-.755.124a.4.4 0 0 1-.26-.757c.32-.109.66-.168 1.015-.168a3.116 3.116 0 0 1 3.123 3.109c0 1.1-.576 2.062-1.44 2.614a4.95 4.95 0 0 1 2.407 1.892.4.4 0 1 1-.663.448 4.16 4.16 0 0 0-3.417-1.848l-.01.001a.4.4 0 1 1 .002-.8h.01a2.314 2.314 0 0 0 2.31-2.307m-3.674 0c0 1.099-.575 2.06-1.438 2.613a4.95 4.95 0 0 1 2.406 1.893.4.4 0 1 1-.663.448c-1.664-2.464-5.292-2.464-6.955 0a.4.4 0 1 1-.663-.448 4.94 4.94 0 0 1 2.47-1.915 3.1 3.1 0 0 1-1.402-2.591c0-1.719 1.4-3.109 3.123-3.109a3.116 3.116 0 0 1 3.122 3.109"
    />
  </svg>
);
const UsersIcon = forwardRef(SvgUsersIcon) as any;
export default UsersIcon;
