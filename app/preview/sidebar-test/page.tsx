'use client'
import { Fragment, useState } from "react";
import svgPaths from "./svg-1wg6eylchp";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SatelliteIcon, MassIcon } from "@/icons";

export default function AntarisSidebar() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative flex h-screen bg-surface-bg overflow-hidden font-['Space_Grotesk',sans-serif]">
      {/* Sidebar Content */}
      <div className={`h-screen border-r border-[#202428] bg-surface-bg flex flex-col gap-[24px] py-7 items-center relative shrink-0 transition-all duration-300 ${isExpanded ? 'w-[240px]' : 'w-17.5'}`}>
        {/* Sidebar Background */}
        <div className="absolute h-full left-0 top-0 w-full pointer-events-none">
          <div className="absolute inset-0">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 240 872">
              <g id="Sidebar">
                <g filter="url(#filter0_d_sidebar)">
                  <mask fill="white" id="sidebar-mask">
                    <path d={svgPaths.p1d840dc0} />
                  </mask>
                  <path d={svgPaths.p1d840dc0} fill="#EEEEEE" fillOpacity="0.01" shapeRendering="crispEdges" />
                  <path d={svgPaths.p28681d00} fill="url(#paint0_linear_sidebar)" mask="url(#sidebar-mask)" />
                </g>
                <g opacity="0.4">
                  <path d={svgPaths.pda8eb40} stroke="#EEEEEE" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="16" strokeWidth="0.8" />
                  <path d={svgPaths.p1b5ff840} stroke="#EEEEEE" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="16" strokeWidth="0.8" />
                </g>
              </g>
              <defs>
                <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="912" id="filter0_d_sidebar" width="280" x="-22" y="-20">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                  <feOffset dx="2" />
                  <feGaussianBlur stdDeviation="10" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                  <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow" />
                  <feBlend in="SourceGraphic" in2="effect1_dropShadow" mode="normal" result="shape" />
                </filter>
                <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_sidebar" x1="218" x2="18" y1="436" y2="436">
                  <stop stopColor="#383838" stopOpacity="0.35" />
                  <stop offset="1" stopColor="#383838" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Antaris Logo */}
        <div className={`h-[24px] opacity-60 overflow-clip relative shrink-0 transition-all duration-300 ${isExpanded ? 'w-[80.308px]' : 'w-full flex items-center justify-center'}`}>
          {isExpanded &&
            <Fragment>
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
            </Fragment>
          }
          {!isExpanded && <SatelliteIcon />}
        </div>

        {/* Sidebar Menu */}
        <div className="content-stretch flex flex-[1_0_0] flex-col items-center justify-between min-h-px min-w-px relative w-full">
          {/* Section 1 - Top Navigation */}
          <div className={`content-stretch flex flex-col gap-[8px] items-start relative shrink-0 transition-all duration-300 ${isExpanded ? 'w-[176px]' : 'w-full'}`}>
            {/* Dashboard */}
            <div className={`content-stretch flex flex-col gap-[8px] items-start relative shrink-0 ${isExpanded ? 'w-[176px]' : 'w-full'}`}>
              <div className={cn(`flex w-full gap-4 relative rounded-[4px] shrink-0 items-center`, isExpanded ? 'justify-start' : 'justify-center')}>
                <Button showText={isExpanded} size='lg' variant='soft' className={cn(`justify-start`, isExpanded && 'w-full')} leadingIcon={<MassIcon />}>
                  Dashboard
                </Button>
              </div>
              <Separator />
            </div>

            {/* Mission Group */}
            <div className={`content-stretch flex flex-col gap-[8px] items-start relative shrink-0 ${isExpanded ? 'w-[176px]' : 'w-full'}`}>
              {/* Mission Objective */}
              <div className={cn(`flex w-full gap-4 relative rounded-[4px] shrink-0 items-center`, isExpanded ? 'justify-start' : 'justify-center')}>
                <Button showText={isExpanded} size='lg' variant='ghost' className={cn(`justify-start`, isExpanded && 'w-full')} leadingIcon={<MassIcon />}>
                  Dashboard
                </Button>
              </div>

              {/* Mission Modelling */}
              <div className={cn(`flex w-full gap-4 relative rounded-[4px] shrink-0 items-center`, isExpanded ? 'justify-start' : 'justify-center')}>
                <Button showText={isExpanded} size='lg' variant='ghost' className={cn(`justify-start`, isExpanded && 'w-full')} leadingIcon={<MassIcon />}>
                  Dashboard
                </Button>
              </div>

              <Separator />
            </div>

            {/* Satellites & Ground Station Group */}
            <div className={`content-stretch flex flex-col gap-[8px] items-start relative shrink-0 ${isExpanded ? 'w-[176px]' : 'w-full'}`}>
              {/* Satellites */}
              <div className={cn(`flex w-full gap-4 relative rounded-[4px] shrink-0 items-center`, isExpanded ? 'justify-start' : 'justify-center')}>
                <Button showText={isExpanded} size='lg' variant='ghost' className={cn(`justify-start`, isExpanded && 'w-full')} leadingIcon={<MassIcon />}>
                  Dashboard
                </Button>
              </div>

              {/* Ground Station */}
              <div className={cn(`flex w-full gap-4 relative rounded-[4px] shrink-0 items-center`, isExpanded ? 'justify-start' : 'justify-center')}>
                <Button showText={isExpanded} size='lg' variant='ghost' className={cn(`justify-start`, isExpanded && 'w-full')} leadingIcon={<MassIcon />}>
                  Dashboard
                </Button>
              </div>

              <Separator />
            </div>

            {/* Catalog Group */}
            <div className={`content-stretch flex flex-col gap-[8px] items-start relative shrink-0 ${isExpanded ? 'w-[176px]' : 'w-full'}`}>
              <div className={cn(`flex w-full gap-4 relative rounded-[4px] shrink-0 items-center`, isExpanded ? 'justify-start' : 'justify-center')}>
                <Button showText={isExpanded} size='lg' variant='ghost' className={cn(`justify-start`, isExpanded && 'w-full')} leadingIcon={<MassIcon />}>
                  Dashboard
                </Button>
              </div>
            </div>
          </div>

          {/* Section 2 - Bottom Navigation */}
          <div className={`content-stretch flex flex-col gap-[8px] items-start relative shrink-0 transition-all duration-300 ${isExpanded ? 'w-[176px]' : 'w-full'}`}>
            <div className={`content-stretch flex flex-col gap-[8px] items-start relative shrink-0 ${isExpanded ? 'w-[176px]' : 'w-full'}`}>
              <Separator />

              {/* Notification */}
              <div className={cn(`flex w-full gap-4 relative rounded-[4px] shrink-0 items-center`, isExpanded ? 'justify-start' : 'justify-center')}>
                <Button showText={isExpanded} size='lg' variant='ghost' className={cn(`justify-start`, isExpanded && 'w-full')} leadingIcon={<MassIcon />}>
                  Dashboard
                </Button>
              </div>

              {/* User Management */}
              <div className={cn(`flex w-full gap-4 relative rounded-[4px] shrink-0 items-center`, isExpanded ? 'justify-start' : 'justify-center')}>
                <Button showText={isExpanded} size='lg' variant='ghost' className={cn(`justify-start`, isExpanded && 'w-full')} leadingIcon={<MassIcon />}>
                  Dashboard
                </Button>
              </div>

              {/* Settings */}
              <div className={cn(`flex w-full gap-4 relative rounded-[4px] shrink-0 items-center`, isExpanded ? 'justify-start' : 'justify-center')}>
                <Button showText={isExpanded} size='lg' variant='ghost' className={cn(`justify-start`, isExpanded && 'w-full')} leadingIcon={<MassIcon />}>
                  Dashboard
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
