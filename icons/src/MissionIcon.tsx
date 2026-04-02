import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgMissionIcon = (
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
      d="M5.653 2.43a6.2 6.2 0 0 1 4.013-.18l-.113.383-.112.384a5.401 5.401 0 1 0 3.672 3.693l.769-.221A6.2 6.2 0 1 1 5.653 2.43m.496 2.41a3.8 3.8 0 0 1 2.29-.405l-.055.397-.054.396a3 3 0 1 0 2.57 2.595l.793-.102a3.8 3.8 0 0 1-2.106 3.895A3.8 3.8 0 0 1 6.15 4.84m2.374 3.33-.334.335a.4.4 0 1 1-.566-.566l.338-.339c-.013 0-.025-.004-.038-.004a.605.605 0 1 0 .604.605c0-.01-.004-.021-.004-.031m.803.03a1.403 1.403 0 1 1-.731-1.234l1.81-1.81V3.975a.9.9 0 0 1 .264-.635l.918-.92.044-.038a.42.42 0 0 1 .633.156l.021.053.3.953.952.3a.42.42 0 0 1 .171.697l-.919.919a.9.9 0 0 1-.636.263H10.97L9.158 7.534c.108.198.168.426.168.667m1.88-3.277h.947c.026 0 .052-.011.07-.03l.475-.475-.543-.17a.42.42 0 0 1-.275-.276l-.17-.544-.476.476a.1.1 0 0 0-.029.07z"
    />
  </svg>
);
const MissionIcon = forwardRef(SvgMissionIcon) as any;
export default MissionIcon;
