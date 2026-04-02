import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgGroundStationIcon = (
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
      d="M2.786 9.797c0-1.072 1.3-1.607 2.054-.845l4.328 4.376h.28a.4.4 0 0 1 0 .8H2.742a.4.4 0 1 1 0-.8h.044zm3.109-6.152a.4.4 0 0 1 .565 0l.315.316 2.34 2.34 1.374-1.373a.4.4 0 0 1 .566.565L9.681 6.866l2.34 2.34.315.316a.4.4 0 1 1-.565.566l-.043-.043c-.818.715-1.712 1.084-2.63 1.073-1.024-.013-2.007-.498-2.871-1.362-.865-.865-1.35-1.848-1.363-2.873-.012-.917.357-1.812 1.072-2.63l-.041-.041a.4.4 0 0 1 0-.567m.607 1.174c-.588.688-.847 1.387-.839 2.054.01.764.371 1.559 1.13 2.317.757.758 1.551 1.119 2.316 1.128.667.008 1.366-.25 2.053-.839zm4.071-2.748a3.41 3.41 0 0 1 3.377 3.376.4.4 0 1 1-.8.008 2.61 2.61 0 0 0-2.584-2.583.4.4 0 0 1 .007-.8M3.587 13.328h4.456L4.271 9.515a.4.4 0 0 0-.684.282z"
    />
  </svg>
);
const GroundStationIcon = forwardRef(SvgGroundStationIcon) as any;
export default GroundStationIcon;
