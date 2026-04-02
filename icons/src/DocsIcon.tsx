import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgDocsIcon = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
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
      d="M2.276 13.333V2.666A1.72 1.72 0 0 1 3.999.943h6c.103 0 .203.041.276.114l3.333 3.333a.4.4 0 0 1 .114.276v.647l.002.02-.002.02v7.98A1.724 1.724 0 0 1 12 15.056h-8a1.724 1.724 0 0 1-1.723-1.723m8.392-2.39a.39.39 0 1 1 0 .78H5.335a.39.39 0 1 1 0-.78zm0-2.666a.39.39 0 0 1 0 .78H5.335a.391.391 0 0 1 0-.78zm-4-2.667a.39.39 0 1 1 0 .78H5.335a.391.391 0 0 1 0-.78zM9.724 4a.944.944 0 0 0 .944.943h2.274v-.116L9.837 1.722h-.113zm-6.669 9.333a.944.944 0 0 0 .944.943h8a.944.944 0 0 0 .943-.943v-7.61h-2.274A1.724 1.724 0 0 1 8.944 4V1.722H3.999a.944.944 0 0 0-.944.944z"
    />
  </svg>
);
const DocsIcon = forwardRef(SvgDocsIcon) as any;
export default DocsIcon;
