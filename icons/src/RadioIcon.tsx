import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgRadioIcon = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
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
      d="M3.468 3.468a.4.4 0 0 1 .565.566c-2.177 2.178-2.178 5.755 0 7.933a.4.4 0 1 1-.565.565c-2.49-2.49-2.49-6.574 0-9.064m8.499 0a.4.4 0 0 1 .565 0 6.36 6.36 0 0 1 0 9.005.4.4 0 1 1-.565-.567 5.56 5.56 0 0 0 0-7.872.4.4 0 0 1 0-.566M10.23 5.203a.4.4 0 0 1 .567 0c1.536 1.536 1.527 4.06.006 5.647a.4.4 0 0 1-.578-.553c1.231-1.285 1.223-3.31.005-4.528a.4.4 0 0 1 0-.566m-5.033-.054a.4.4 0 0 1 .578.554c-1.231 1.285-1.223 3.31-.005 4.527a.4.4 0 0 1-.567.567c-1.536-1.536-1.527-4.06-.006-5.648M8.797 8A.797.797 0 1 0 7.202 8a.797.797 0 0 0 1.595 0m.8 0a1.597 1.597 0 1 1-3.194 0 1.597 1.597 0 0 1 3.194 0"
    />
  </svg>
);
const RadioIcon = forwardRef(SvgRadioIcon) as any;
export default RadioIcon;
