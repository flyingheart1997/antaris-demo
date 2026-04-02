import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgMassIcon = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
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
      d="M9.123 3.76a1.403 1.403 0 1 0-2.806 0 1.403 1.403 0 0 0 2.806 0M4.29 5.975a.8.8 0 0 0-.635.57v.002l-1.499 5.427h.001a.804.804 0 0 0 .762 1.003h9.61a.804.804 0 0 0 .792-.928l-.019-.09-1.518-5.386-.002-.009a.8.8 0 0 0-.64-.59l-.13-.011H4.418zM9.923 3.76c0 .533-.19 1.022-.505 1.403h1.6a1.6 1.6 0 0 1 1.538 1.201h-.001l1.517 5.378.039.18a1.6 1.6 0 0 1-1.582 1.855H2.905a1.602 1.602 0 0 1-1.522-2.003l.001-.005 1.5-5.435.001-.002a1.6 1.6 0 0 1 1.525-1.169h1.613A2.204 2.204 0 1 1 9.923 3.76"
    />
  </svg>
);
const MassIcon = forwardRef(SvgMassIcon) as any;
export default MassIcon;
