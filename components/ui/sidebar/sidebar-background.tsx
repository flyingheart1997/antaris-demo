"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import svgPaths from "./sidebar-svgs";
import { useSidebar } from ".";
import { AntarisIcon } from "@/icons";

// -----------------------------------------------------------------------------
// Enterprise Fluid SVG Architecture (High-Performance Engine)
// -----------------------------------------------------------------------------
/**
 * Professional standard for fluid SVG geometry scaling involves:
 * 1. AST (Abstract Syntax Tree) Pre-parsing: Convert strings to numeric command objects ONCE.
 * 2. Direct DOM Manipulation (DDM): Skip React reconciliation during 60fps animations.
 * 3. Unified Liquid Logic: Apply a single coordinate mapping pass per frame.
 */

type SVGCommand = { cmd: string; args: number[] };
type SVGAST = SVGCommand[];

/**
 * Parses raw SVG path string into a structured numeric AST for rapid map-updates.
 */
function parseSVGPath(pathStr: string): SVGAST {
  const ast: SVGAST = [];
  const regex = /([a-zA-Z])([^a-zA-Z]*)/g;
  const numRegex = /-?[0-9]*\.?[0-9]+(?:e-?[0-9]+)?/gi;

  let match;
  while ((match = regex.exec(pathStr)) !== null) {
    const cmd = match[1];
    const argsStr = match[2];

    if (cmd.toUpperCase() === "Z") {
      ast.push({ cmd, args: [] });
      continue;
    }

    const args: number[] = [];
    let numMatch;
    while ((numMatch = numRegex.exec(argsStr)) !== null) {
      args.push(parseFloat(numMatch[0]));
    }
    ast.push({ cmd, args });
  }
  return ast;
}

// Pre-compute original coordinates into a high-speed AST model.
const AST_BACKGROUND_MASK = parseSVGPath(svgPaths.p1d840dc0);
const AST_BACKGROUND_BORDER = parseSVGPath(svgPaths.p28681d00);
const AST_ICON_ARROW_LEFT = parseSVGPath(svgPaths.pda8eb40);
const AST_ICON_ARROW_RIGHT = parseSVGPath(svgPaths.p1b5ff840);

/**
 * Main Background Logic
 */
export function SidebarBackground() {
  const { toggleSidebar, state } = useSidebar();
  const isCollapsed = state === "collapsed";

  // Persistent Refs to DOM nodes to bypass React render cycle for performance.
  const containerRef = React.useRef<HTMLDivElement>(null);
  const svgRef = React.useRef<SVGSVGElement>(null);
  const maskPathRef = React.useRef<SVGPathElement>(null);
  const bgPathRef = React.useRef<SVGPathElement>(null);
  const borderPathRef = React.useRef<SVGPathElement>(null);
  const arrowLRef = React.useRef<SVGPathElement>(null);
  const arrowRRef = React.useRef<SVGPathElement>(null);
  const hitzoneRef = React.useRef<SVGRectElement>(null);
  const toggleGroupRef = React.useRef<SVGGElement>(null);
  const gradientRef = React.useRef<SVGLinearGradientElement>(null);
  const filterRef = React.useRef<SVGFilterElement>(null);

  /**
   * Fluid Mapping Logic (Pure Function)
   */
  const computeLiquidPath = React.useCallback((ast: SVGAST, w: number, h: number) => {
    // 4px consistent padding logic
    const X_SHIFT_LEFT = 4 - 18;
    const X_SHIFT_RIGHT = w - 1 - 218;
    const Y_SHIFT_TOP = 4 - 20;
    const Y_SHIFT_BOTTOM = h - 4 - 852;
    const Y_SHIFT_CENTER = h / 2 - 436;

    const mapX = (x: number) => (x < 100 ? x + X_SHIFT_LEFT : x + X_SHIFT_RIGHT);
    const mapY = (y: number) => {
      if (y < 200) return y + Y_SHIFT_TOP;
      if (y > 700) return y + Y_SHIFT_BOTTOM;
      return y + Y_SHIFT_CENTER;
    };

    let out = "";
    for (let i = 0; i < ast.length; i++) {
      const { cmd, args } = ast[i];
      if (cmd.toUpperCase() === "Z") {
        out += cmd;
        continue;
      }
      const newArgs: number[] = [];
      if (cmd.toUpperCase() === "V") {
        for (let j = 0; j < args.length; j++) newArgs.push(mapY(args[j]));
      } else if (cmd.toUpperCase() === "H") {
        for (let j = 0; j < args.length; j++) newArgs.push(mapX(args[j]));
      } else {
        for (let j = 0; j < args.length; j += 2) {
          newArgs.push(mapX(args[j]), mapY(args[j + 1]));
        }
      }
      out += cmd + " " + newArgs.join(" ");
    }
    return out;
  }, []);

  /**
   * Native Update Loop (DDM Strategy)
   * This logic maintains 4px padding in every frame of the layout transition.
   */
  React.useLayoutEffect(() => {
    if (!containerRef.current) return;

    const updateDOM = (w: number, h: number) => {
      if (!svgRef.current) return;

      // Update basic view attributes
      svgRef.current.setAttribute("viewBox", `0 0 ${w} ${h}`);
      if (filterRef.current) {
        filterRef.current.setAttribute("width", (w + 40).toString());
        filterRef.current.setAttribute("height", (h + 40).toString());
      }

      // Compute liquid shapes
      const maskD = computeLiquidPath(AST_BACKGROUND_MASK, w, h);
      const borderD = computeLiquidPath(AST_BACKGROUND_BORDER, w, h);
      const arrowLD = computeLiquidPath(AST_ICON_ARROW_LEFT, w, h);
      const arrowRD = computeLiquidPath(AST_ICON_ARROW_RIGHT, w, h);

      // Direct DOM Assignment (No React Render required from here)
      maskPathRef.current?.setAttribute("d", maskD);
      bgPathRef.current?.setAttribute("d", maskD);
      borderPathRef.current?.setAttribute("d", borderD);
      arrowLRef.current?.setAttribute("d", arrowLD);
      arrowRRef.current?.setAttribute("d", arrowRD);

      // Align hitzone & gradient center offsets
      const XR = w - 1 - 218;
      const XL = 4 - 18;
      const YC = h / 2 - 436;

      if (hitzoneRef.current) {
        hitzoneRef.current.setAttribute("x", (198.067 + XR).toString());
        hitzoneRef.current.setAttribute("y", (416.5 + YC).toString());
      }

      if (gradientRef.current) {
        gradientRef.current.setAttribute("x1", (218 + XR).toString());
        gradientRef.current.setAttribute("x2", (18 + XL).toString());
        gradientRef.current.setAttribute("y1", (436 + YC).toString());
        gradientRef.current.setAttribute("y2", (436 + YC).toString());
      }
    };

    // Observer observes the CSS layout transition of the parent container.
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        // Since we are in the observer, this runs in sync with browser's layout engine.
        // Direct DOM calls here are much faster than React reconciliation.
        updateDOM(width, height);
      }
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [computeLiquidPath]);

  return (
    <div ref={containerRef} className="absolute h-full left-0 top-0 w-full pointer-events-none z-0">
      <div className="absolute inset-0">
        <svg ref={svgRef} className="block size-full overflow-visible" fill="none">
          <g id="Sidebar">
            <g filter="url(#filter0_d_sidebar)">
              <mask fill="white" id="sidebar-mask">
                <path ref={maskPathRef} />
              </mask>
              <path ref={bgPathRef} fill="#EEEEEE" fillOpacity="0.01" shapeRendering="crispEdges" />
              <path ref={borderPathRef} fill="url(#paint0_linear_sidebar)" mask="url(#sidebar-mask)" />
            </g>
            <g
              ref={toggleGroupRef}
              opacity="0.4"
              onClick={toggleSidebar}
              className={cn(
                "cursor-pointer pointer-events-auto hover:opacity-100 transition-all duration-200 ease-linear",
                isCollapsed && "rotate-180"
              )}
              style={{ transformOrigin: "center center", transformBox: "fill-box" }}
            >
              <rect ref={hitzoneRef} width="40" height="40" fill="transparent" />
              <path ref={arrowLRef} stroke="#EEEEEE" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="16" strokeWidth="0.8" />
              <path ref={arrowRRef} stroke="#EEEEEE" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="16" strokeWidth="0.8" />
            </g>
          </g>
          <defs>
            <filter ref={filterRef} colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" x="-22" y="-20" id="filter0_d_sidebar">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dx="2" />
              <feGaussianBlur stdDeviation="10" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow" mode="normal" result="shape" />
            </filter>
            <linearGradient ref={gradientRef} gradientUnits="userSpaceOnUse" id="paint0_linear_sidebar">
              <stop stopColor="#383838" stopOpacity="0.35" />
              <stop offset="1" stopColor="#383838" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

/**
 * SidebarLogo (Antaris Identity)
 */
export function SidebarLogo({ isExpanded }: { isExpanded?: boolean }) {
  const { state } = useSidebar();
  const expanded = isExpanded ?? state === "expanded";

  return (
    <div className={cn(
      "h-[24px] opacity-60 overflow-clip relative shrink-0 transition-all duration-200 ease-linear z-10",
      expanded ? "w-[80.308px]" : "w-full flex items-center justify-center"
    )}>
      {expanded ? (
        <React.Fragment>
          {/* Logo Identity SVG Layers */}
          <div className="absolute h-[7.154px] left-[12.46px] top-[5.54px] w-5.25">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 7.15385">
              <path d={svgPaths.p272688c0} fill="#EEEEEE" />
            </svg>
          </div>
          <div className="absolute flex h-[7.154px] items-center justify-center left-[46.15px] top-[5.54px] w-5.25">
            <div className="-scale-y-100 flex-none rotate-180">
              <div className="h-[7.154px] relative w-5.25">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 7.15385">
                  <path d={svgPaths.p272688c0} fill="#EEEEEE" />
                </svg>
              </div>
            </div>
          </div>
          <div className="absolute left-[34.15px] size-[11.077px] top-0">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.0769 11.0769">
              <g clipPath="url(#clip0_logo)">
                <g>
                  <path d={svgPaths.p315261c0} fill="#EEEEEE" />
                  <path d={svgPaths.p2f0bba00} fill="#EEEEEE" />
                  <path d={svgPaths.p18a24f00} fill="#EEEEEE" />
                  <g>
                    <path d={svgPaths.p1b6c6600} fill="#EEEEEE" />
                    <path d={svgPaths.p19627200} fill="#EEEEEE" />
                    <path d={svgPaths.p1047d780} fill="#EEEEEE" />
                    <path d={svgPaths.p29766e80} fill="#EEEEEE" />
                  </g>
                  <g>
                    <path d={svgPaths.p1870aa00} fill="#EEEEEE" />
                    <path d={svgPaths.p32514400} fill="#EEEEEE" />
                    <path d={svgPaths.p1d082d80} fill="#EEEEEE" />
                    <path d={svgPaths.p1c342e00} fill="#EEEEEE" />
                  </g>
                </g>
              </g>
              <defs>
                <clipPath id="clip0_logo">
                  <rect fill="white" height="11.0769" width="11.0769" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div className="absolute h-[9.462px] left-0 top-[14.54px] w-[80.308px]">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 80.3077 9.46154">
              <g>
                <path clipRule="evenodd" d={svgPaths.p36926b80} fill="#EEEEEE" fillRule="evenodd" />
                <path clipRule="evenodd" d={svgPaths.p22596c00} fill="#EEEEEE" fillRule="evenodd" />
                <path d={svgPaths.p59cd280} fill="#EEEEEE" />
                <path d={svgPaths.p3f3ac000} fill="#EEEEEE" />
                <path d={svgPaths.p1d2171} fill="#EEEEEE" />
                <path d={svgPaths.p3c08c980} fill="#EEEEEE" />
                <path d={svgPaths.p3c563c80} fill="#EEEEEE" />
              </g>
            </svg>
          </div>
        </React.Fragment>
      ) : (
        <AntarisIcon />
      )}
    </div>
  );
}
