'use client'
import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import svgPaths from "./svg-1wg6eylchp";
import { imgSideNav, imgSideNav1, imgSideNav2, imgSideNav3, imgSideNav4, imgSideNav5, imgSideNav6, imgSideNav7 } from "./svg-yqlih";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export default function AntarisSidebar() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative flex h-screen bg-[#0E1015] overflow-hidden font-['Space_Grotesk',sans-serif]">
      {/* Sidebar Content */}
      <div className={`h-screen border-r border-[#202428] bg-[#0A0D10] flex flex-col gap-[24px] py-7 items-center relative shrink-0 transition-all duration-300 ${isExpanded ? 'w-[240px]' : 'w-[88px]'}`}>
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
        <div className={`h-[24px] opacity-60 overflow-clip relative shrink-0 transition-all duration-300 ${isExpanded ? 'w-[80.308px]' : 'w-[32px]'
          }`}>
          <div className="absolute h-[7.154px] left-[12.46px] top-[5.54px] w-5.25">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 7.15385">
              <path d={svgPaths.p272688c0} fill="#EEEEEE" />
            </svg>
          </div>
          {isExpanded && (
            <>
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
            </>
          )}
        </div>

        {/* Sidebar Menu */}
        <div className="content-stretch flex flex-[1_0_0] flex-col items-center justify-between min-h-px min-w-px relative w-full">
          {/* Section 1 - Top Navigation */}
          <div className={`content-stretch flex flex-col gap-[8px] items-start relative shrink-0 transition-all duration-300 ${isExpanded ? 'w-[176px]' : 'w-full'}`}>
            {/* Dashboard */}
            <div className={`content-stretch flex flex-col gap-[8px] items-start relative shrink-0 ${isExpanded ? 'w-[176px]' : 'w-full'}`}>
              <div className={cn(`flex w-full gap-4 relative rounded-[4px] shrink-0 items-center`, isExpanded ? 'justify-start pr-3' : 'justify-center')}>
                <div className=" bg-white shrink-0 h-40 w-40">

                </div>
                {isExpanded && (
                  <div className="flex flex-[1_0_0] flex-col font-['Space_Grotesk',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px relative text-[#b4b4b4] text-[12px] tracking-[0.096px]">
                    <p className="leading-[16px]">Dashboard</p>
                  </div>
                )}
              </div>
              <Separator />
            </div>

            {/* Mission Group */}
            <div className={`content-stretch flex flex-col gap-[8px] items-start relative shrink-0 ${isExpanded ? 'w-[176px]' : 'w-full'}`}>
              {/* Mission Objective */}
              <div className={cn(`flex w-full gap-4 relative rounded-[4px] shrink-0 items-center`, isExpanded ? 'justify-start pr-3' : 'justify-center')}>
                <div className=" bg-white shrink-0 h-40 w-40">

                </div>
                {isExpanded && (
                  <div className="flex flex-[1_0_0] flex-col font-['Space_Grotesk',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px relative text-[#b4b4b4] text-[12px] tracking-[0.096px]">
                    <p className="leading-[16px]">Dashboard</p>
                  </div>
                )}
              </div>

              {/* Mission Modelling */}
              <div className={cn(`flex w-full gap-4 relative rounded-[4px] shrink-0 items-center`, isExpanded ? 'justify-start pr-3' : 'justify-center')}>
                <div className=" bg-white shrink-0 h-40 w-40">

                </div>
                {isExpanded && (
                  <div className="flex flex-[1_0_0] flex-col font-['Space_Grotesk',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px relative text-[#b4b4b4] text-[12px] tracking-[0.096px]">
                    <p className="leading-[16px]">Dashboard</p>
                  </div>
                )}
              </div>

              <Separator />
            </div>

            {/* Satellites & Ground Station Group */}
            <div className={`content-stretch flex flex-col gap-[8px] items-start relative shrink-0 ${isExpanded ? 'w-[176px]' : 'w-full'}`}>
              {/* Satellites */}
              <div className={cn(`flex w-full gap-4 relative rounded-[4px] shrink-0 items-center`, isExpanded ? 'justify-start pr-3' : 'justify-center')}>
                <div className=" bg-white shrink-0 h-40 w-40">

                </div>
                {isExpanded && (
                  <div className="flex flex-[1_0_0] flex-col font-['Space_Grotesk',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px relative text-[#b4b4b4] text-[12px] tracking-[0.096px]">
                    <p className="leading-[16px]">Dashboard</p>
                  </div>
                )}
              </div>

              {/* Ground Station */}
              <div className={cn(`flex w-full gap-4 relative rounded-[4px] shrink-0 items-center`, isExpanded ? 'justify-start pr-3' : 'justify-center')}>
                <div className=" bg-white shrink-0 h-40 w-40">

                </div>
                {isExpanded && (
                  <div className="flex flex-[1_0_0] flex-col font-['Space_Grotesk',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px relative text-[#b4b4b4] text-[12px] tracking-[0.096px]">
                    <p className="leading-[16px]">Dashboard</p>
                  </div>
                )}
              </div>

              <Separator />
            </div>

            {/* Catalog Group */}
            <div className={`content-stretch flex flex-col gap-[8px] items-start relative shrink-0 ${isExpanded ? 'w-[176px]' : 'w-full'}`}>
              <div className={cn(`flex w-full gap-4 relative rounded-[4px] shrink-0 items-center`, isExpanded ? 'justify-start pr-3' : 'justify-center')}>
                <div className=" bg-white shrink-0 h-40 w-40">

                </div>
                {isExpanded && (
                  <div className="flex flex-[1_0_0] flex-col font-['Space_Grotesk',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px relative text-[#b4b4b4] text-[12px] tracking-[0.096px]">
                    <p className="leading-[16px]">Dashboard</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Section 2 - Bottom Navigation */}
          <div className={`content-stretch flex flex-col gap-[8px] items-start relative shrink-0 transition-all duration-300 ${isExpanded ? 'w-[176px]' : 'w-full'}`}>
            <div className={`content-stretch flex flex-col gap-[8px] items-start relative shrink-0 ${isExpanded ? 'w-[176px]' : 'w-full'}`}>
              <Separator />

              {/* Notification */}
              <div className={cn(`flex w-full gap-4 relative rounded-[4px] shrink-0 items-center`, isExpanded ? 'justify-start pr-3' : 'justify-center')}>
                <div className=" bg-white shrink-0 h-40 w-40">

                </div>
                {isExpanded && (
                  <div className="flex flex-[1_0_0] flex-col font-['Space_Grotesk',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px relative text-[#b4b4b4] text-[12px] tracking-[0.096px]">
                    <p className="leading-[16px]">Dashboard</p>
                  </div>
                )}
              </div>

              {/* User Management */}
              <div className={cn(`flex w-full gap-4 relative rounded-[4px] shrink-0 items-center`, isExpanded ? 'justify-start pr-3' : 'justify-center')}>
                <div className=" bg-white shrink-0 h-40 w-40">

                </div>
                {isExpanded && (
                  <div className="flex flex-[1_0_0] flex-col font-['Space_Grotesk',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px relative text-[#b4b4b4] text-[12px] tracking-[0.096px]">
                    <p className="leading-[16px]">Dashboard</p>
                  </div>
                )}
              </div>

              {/* Settings */}
              <div className={cn(`flex w-full gap-4 relative rounded-[4px] shrink-0 items-center`, isExpanded ? 'justify-start pr-3' : 'justify-center')}>
                <div className=" bg-white shrink-0 h-40 w-40">

                </div>
                {isExpanded && (
                  <div className="flex flex-[1_0_0] flex-col font-['Space_Grotesk',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px relative text-[#b4b4b4] text-[12px] tracking-[0.096px]">
                    <p className="leading-[16px]">Dashboard</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto">
        {/* Header */}
        <header className="flex items-center gap-4 px-8 h-[64px] border-b border-[#202428] shrink-0 bg-[#0A0D10]">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-center size-[32px] rounded-full bg-[#1C2024] hover:bg-[#2A2F34] transition-colors border border-[#2B3035] text-[#B4B4B4]"
          >
            <ChevronLeft size={16} className={!isExpanded ? "rotate-180 transition-transform" : "transition-transform"} />
          </button>
          <span className="text-[14px] font-bold text-white tracking-wide">Antaris Design System</span>
        </header>

        {/* Content */}
        <main className="p-8 md:p-12 max-w-300 w-full mx-auto relative bg-[#0E1015] flex-1">
          <h1 className="text-[28px] font-bold text-white mb-2 tracking-tight">Sidebar Demo</h1>
          <p className="text-[15px] text-[#A0A5AA] mb-10 tracking-wide">This is a pixel-perfect implementation of the Antaris Design System sidebar based on the Figma design.</p>

          {/* Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
            <div className="p-6 rounded-xl bg-[#161A1F] border border-[#202428] hover:bg-[#1C2025] transition-colors">
              <h3 className="text-[16px] font-bold text-white mb-3">Extended Sidebar</h3>
              <p className="text-[14px] text-[#868C93] leading-relaxed">Width: 206px with full menu labels<br />and Antaris logo</p>
            </div>
            <div className="p-6 rounded-xl bg-[#161A1F] border border-[#202428] hover:bg-[#1C2025] transition-colors">
              <h3 className="text-[16px] font-bold text-white mb-3">Collapsed Sidebar</h3>
              <p className="text-[14px] text-[#868C93] leading-relaxed">Width: 64px with icons only and<br />satellite logo</p>
            </div>
            <div className="p-6 rounded-xl bg-[#161A1F] border border-[#202428] hover:bg-[#1C2025] transition-colors">
              <h3 className="text-[16px] font-bold text-white mb-3">Glass Morphism</h3>
              <p className="text-[14px] text-[#868C93] leading-relaxed">Backdrop blur with gradient<br />borders and shadows</p>
            </div>
          </div>

          {/* Features */}
          <div className="p-8 rounded-xl bg-[#161A1F] border border-[#202428] mb-10">
            <h3 className="text-[18px] font-bold text-white mb-6">Features</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-[14px] text-[#A0A5AA]">
                <div className="size-1.5 rounded-full bg-[#E79E2C] ring-2 ring-[#E79E2C]/20 shadow-[0_0_8px_#E79E2C]"></div>
                Notification badge indicator (orange dot)
              </li>
              <li className="flex items-center gap-3 text-[14px] text-[#A0A5AA]">
                <div className="size-1.5 rounded-full bg-[#565B62]"></div>
                Space Grotesk font at 12px with 0.096px letter spacing
              </li>
              <li className="flex items-center gap-3 text-[14px] text-[#A0A5AA]">
                <div className="size-1.5 rounded-full bg-[#565B62]"></div>
                Gradient separators between menu sections
              </li>
              <li className="flex items-center gap-3 text-[14px] text-[#A0A5AA]">
                <div className="size-1.5 rounded-full bg-[#565B62]"></div>
                User avatar badge with initials "AF" at the bottom
              </li>
              <li className="flex items-center gap-3 text-[14px] text-[#A0A5AA]">
                <div className="size-1.5 rounded-full bg-[#565B62]"></div>
                Smooth transitions between collapsed and expanded states
              </li>
              <li className="flex items-center gap-3 text-[14px] text-[#A0A5AA]">
                <div className="size-1.5 rounded-full bg-[#565B62]"></div>
                Exact spacing: 12px horizontal padding, 8px vertical padding, 24px gap between sections
              </li>
            </ul>
          </div>

          {/* Menu Sections */}
          <div className="p-8 rounded-xl bg-[#161A1F] border border-[#202428] mb-10 relative">
            <h3 className="text-[18px] font-bold text-white mb-8">Menu Sections</h3>
            <div className="flex flex-col md:flex-row gap-16 md:gap-[160px]">
              <div>
                <h4 className="text-[15px] font-bold text-white mb-4">Main Navigation</h4>
                <ul className="space-y-3">
                  {['Dashboard', 'Mission Objective', 'Mission Modelling', 'Satellites', 'Ground Station', 'Catalog'].map(item => (
                    <li key={item} className="flex items-center gap-3 text-[14px] text-[#A0A5AA]">
                      <div className="size-0.75 rounded-full bg-[#565B62]"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-[15px] font-bold text-white mb-4">Bottom Section</h4>
                <ul className="space-y-3">
                  {['Notification (with badge)', 'User Management', 'Settings (with avatar)'].map(item => (
                    <li key={item} className="flex items-center gap-3 text-[14px] text-[#A0A5AA]">
                      <div className="size-0.75 rounded-full bg-[#565B62]"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* Help Button */}
            <button className="absolute bottom-8 right-8 flex items-center justify-center size-10 rounded-full bg-[#1C2024] hover:bg-[#2A2F34] transition-colors border border-[#2B3035] text-[#868C93] text-sm font-bold">
              ?
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
