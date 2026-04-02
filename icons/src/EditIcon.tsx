import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgEditIcon = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
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
      d="M9.003 13.6a.4.4 0 0 1 0 .8H3.169a.4.4 0 0 1 0-.8zm2.93-9.186a1.014 1.014 0 0 0-1.73-.717l-6.01 6.01a.93.93 0 0 0-.236.397l-.525 1.797 1.797-.525a.93.93 0 0 0 .399-.235l6.009-6.01c.19-.19.297-.448.297-.717m.8 0c0 .481-.19.943-.53 1.283l-6.01 6.01c-.205.205-.46.356-.739.438l-1.915.56a.735.735 0 0 1-.916-.522.74.74 0 0 1 .007-.388l.56-1.916.074-.204c.086-.199.21-.38.364-.534l6.009-6.01a1.814 1.814 0 0 1 3.096 1.283"
    />
  </svg>
);
const EditIcon = forwardRef(SvgEditIcon) as any;
export default EditIcon;
