import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgNotificationsIcon = (
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
      d="M6.674 13.517a.4.4 0 0 1 .543.158.894.894 0 0 0 1.565 0 .4.4 0 0 1 .701.385 1.694 1.694 0 0 1-2.968 0 .4.4 0 0 1 .159-.543M11.6 6a3.601 3.601 0 0 0-7.2 0c0 2.627-.619 4.26-1.206 5.213a.2.2 0 0 0-.01.076.5.5 0 0 0 .041.175c.028.06.06.102.086.124q.013.01.018.012h9.342q.006-.002.017-.012a.474.474 0 0 0 .129-.299c.002-.053-.01-.075-.011-.076C12.219 10.259 11.6 8.627 11.6 6m.807.456c.066 2.223.61 3.574 1.08 4.337.2.325.14.727.017.999-.12.266-.395.608-.825.608H3.32c-.43 0-.704-.342-.824-.608-.123-.272-.185-.674.015-.999.47-.763 1.015-2.114 1.082-4.337L3.6 6a4.4 4.4 0 1 1 8.8 0z"
    />
  </svg>
);
const NotificationsIcon = forwardRef(SvgNotificationsIcon) as any;
export default NotificationsIcon;
