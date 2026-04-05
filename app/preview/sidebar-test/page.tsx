'use client'
import { useState } from "react";
import svgPaths from "./svg-1wg6eylchp";
import { imgSideNav, imgSideNav1, imgSideNav2, imgSideNav3, imgSideNav4, imgSideNav5, imgSideNav6, imgSideNav7 } from "./svg-yqlih";

export default function AntarisSidebar() {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="relative h-screen">
      <div className={`h-screen flex flex-col gap-[24px] py-7 items-center relative rounded-[4px] transition-all duration-300 ${isExpanded ? 'w-[240px]' : 'w-[88px]'}`}>
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
              <div className={`h-[32px] relative rounded-[4px] shrink-0 ${isExpanded ? 'min-w-24.5 w-full' : 'w-full'}`}>
                <div className="flex flex-row items-center justify-center min-w-[inherit] size-full">
                  <div className={`content-stretch flex gap-[4px] items-center min-w-[inherit] relative size-full ${isExpanded ? 'justify-center px-3' : 'justify-center'
                    }`}>
                    <div className="relative shrink-0 size-[16px]">
                      <div className="absolute inset-[8.3%_8.42%_8.38%_8.45%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-[-1.352px_-1.328px] mask-size-[16px_16px]" style={{ maskImage: `url('${imgSideNav}')` }}>
                        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3018 13.3311">
                          <g>
                            <path d={svgPaths.p2296ef40} fill="#B4B4B4" />
                          </g>
                        </svg>
                      </div>
                    </div>
                    {isExpanded && (
                      <div className="flex flex-[1_0_0] flex-col font-['Space_Grotesk',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px relative text-[#b4b4b4] text-[12px] tracking-[0.096px]">
                        <p className="leading-[16px]">Dashboard</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {isExpanded && (
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                  <div className="h-0 relative shrink-0 w-full">
                    <div className="absolute inset-[-0.25px_-0.14%]">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 176.496 0.496">
                        <path d="M0.248 0.248H176.248" opacity="0.4" stroke="url(#paint0_linear_sep1)" strokeLinecap="round" strokeWidth="0.496" />
                        <defs>
                          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_sep1" x1="176.248" x2="0.248" y1="0.748" y2="0.748">
                            <stop stopColor="#F0F0F0" stopOpacity="0.1" />
                            <stop offset="0.5" stopColor="#F0F0F0" stopOpacity="0.4" />
                            <stop offset="1" stopColor="#F0F0F0" stopOpacity="0.1" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Mission Group */}
            <div className={`content-stretch flex flex-col gap-[8px] items-start relative shrink-0 ${isExpanded ? 'w-[176px]' : 'w-full'}`}>
              {/* Mission Objective */}
              <div className={`h-[32px] relative rounded-[4px] shrink-0 ${isExpanded ? 'min-w-24.5 w-full' : 'w-full'}`}>
                <div className="flex flex-row items-center justify-center min-w-[inherit] size-full">
                  <div className={`content-stretch flex gap-[4px] items-center min-w-[inherit] relative size-full ${isExpanded ? 'justify-center px-3' : 'justify-center'
                    }`}>
                    <div className="relative shrink-0 size-[16px]">
                      <div className="absolute inset-[12.5%_11.73%_10%_10.77%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-[-1.724px_-2px] mask-size-[16px_16px]" style={{ maskImage: `url('${imgSideNav1}')` }}>
                        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.3993 12.4004">
                          <g>
                            <g />
                            <path d={svgPaths.p3b331180} fill="#B4B4B4" />
                          </g>
                        </svg>
                      </div>
                    </div>
                    {isExpanded && (
                      <div className="flex flex-[1_0_0] flex-col font-['Space_Grotesk',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px relative text-[#b4b4b4] text-[12px] tracking-[0.096px]">
                        <p className="leading-[16px]">Mission Objective</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Mission Modelling */}
              <div className={`h-[32px] relative rounded-[4px] shrink-0 ${isExpanded ? 'min-w-24.5 w-full' : 'w-full'}`}>
                <div className="flex flex-row items-center justify-center min-w-[inherit] size-full">
                  <div className={`content-stretch flex gap-[4px] items-center min-w-[inherit] relative size-full ${isExpanded ? 'justify-center px-3' : 'justify-center'
                    }`}>
                    <div className="overflow-clip relative shrink-0 size-[16px]">
                      <div className="absolute inset-[10%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-[-1.6px_-1.6px] mask-size-[16px_16px]" style={{ maskImage: `url('${imgSideNav2}')` }}>
                        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.8008 12.8008">
                          <g>
                            <path d={svgPaths.p10a4e600} fill="#B4B4B4" />
                          </g>
                        </svg>
                      </div>
                    </div>
                    {isExpanded && (
                      <div className="flex flex-[1_0_0] flex-col font-['Space_Grotesk',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px relative text-[#b4b4b4] text-[12px] tracking-[0.096px]">
                        <p className="leading-[16px]">Mission Modelling</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {isExpanded && (
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                  <div className="h-0 relative shrink-0 w-full">
                    <div className="absolute inset-[-0.25px_-0.14%]">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 176.496 0.496">
                        <path d="M0.248 0.248H176.248" opacity="0.4" stroke="url(#paint0_linear_sep2)" strokeLinecap="round" strokeWidth="0.496" />
                        <defs>
                          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_sep2" x1="176.248" x2="0.248" y1="0.748" y2="0.748">
                            <stop stopColor="#F0F0F0" stopOpacity="0.1" />
                            <stop offset="0.5" stopColor="#F0F0F0" stopOpacity="0.4" />
                            <stop offset="1" stopColor="#F0F0F0" stopOpacity="0.1" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Satellites & Ground Station Group */}
            <div className={`content-stretch flex flex-col gap-[8px] items-start relative shrink-0 ${isExpanded ? 'w-[176px]' : 'w-full'}`}>
              {/* Satellites */}
              <div className={`h-[32px] relative rounded-[4px] shrink-0 ${isExpanded ? 'min-w-24.5 w-full' : 'w-full'}`}>
                <div className="flex flex-row items-center justify-center min-w-[inherit] size-full">
                  <div className={`content-stretch flex gap-[4px] items-center min-w-[inherit] relative size-full ${isExpanded ? 'justify-center px-3' : 'justify-center'
                    }`}>
                    <div className="relative shrink-0 size-[16px]">
                      <div className="absolute inset-[10%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-[-1.6px_-1.6px] mask-size-[16px_16px]" style={{ maskImage: `url('${imgSideNav3}')` }}>
                        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.7997 12.7999">
                          <g>
                            <path d={svgPaths.p9481580} fill="#B4B4B4" />
                          </g>
                        </svg>
                      </div>
                    </div>
                    {isExpanded && (
                      <div className="flex flex-[1_0_0] flex-col font-['Space_Grotesk',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px relative text-[#b4b4b4] text-[12px] tracking-[0.096px]">
                        <p className="leading-[16px]">Satellites</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Ground Station */}
              <div className={`h-[32px] relative rounded-[4px] shrink-0 ${isExpanded ? 'min-w-24.5 w-full' : 'w-full'}`}>
                <div className="flex flex-row items-center justify-center min-w-[inherit] size-full">
                  <div className={`content-stretch flex gap-[4px] items-center min-w-[inherit] relative size-full ${isExpanded ? 'justify-center px-3' : 'justify-center'
                    }`}>
                    <div className="relative shrink-0 size-[16px]">
                      <div className="absolute inset-[12.94%_12.82%_11.7%_14.63%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-[-2.341px_-2.071px] mask-size-[16px_16px]" style={{ maskImage: `url('${imgSideNav4}')` }}>
                        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6084 12.0567">
                          <g>
                            <path d={svgPaths.p398d280} fill="#B4B4B4" />
                          </g>
                        </svg>
                      </div>
                    </div>
                    {isExpanded && (
                      <div className="flex flex-[1_0_0] flex-col font-['Space_Grotesk',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px relative text-[#b4b4b4] text-[12px] tracking-[0.096px]">
                        <p className="leading-[16px]">Ground Station</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {isExpanded && (
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                  <div className="h-0 relative shrink-0 w-full">
                    <div className="absolute inset-[-0.25px_-0.14%]">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 176.496 0.496">
                        <path d="M0.248 0.248H176.248" opacity="0.4" stroke="url(#paint0_linear_sep3)" strokeLinecap="round" strokeWidth="0.496" />
                        <defs>
                          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_sep3" x1="176.248" x2="0.248" y1="0.748" y2="0.748">
                            <stop stopColor="#F0F0F0" stopOpacity="0.1" />
                            <stop offset="0.5" stopColor="#F0F0F0" stopOpacity="0.4" />
                            <stop offset="1" stopColor="#F0F0F0" stopOpacity="0.1" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Catalog Group */}
            <div className={`content-stretch flex flex-col gap-[8px] items-start relative shrink-0 ${isExpanded ? 'w-[176px]' : 'w-full'}`}>
              <div className={`h-[32px] relative rounded-[4px] shrink-0 ${isExpanded ? 'min-w-24.5 w-full' : 'w-full'}`}>
                <div className="flex flex-row items-center justify-center min-w-[inherit] size-full">
                  <div className={`content-stretch flex gap-[4px] items-center min-w-[inherit] relative size-full ${isExpanded ? 'justify-center px-3' : 'justify-center'
                    }`}>
                    <div className="overflow-clip relative shrink-0 size-[16px]">
                      <div className="absolute inset-[7.5%_17.5%_7.5%_12.5%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-[-2px_-1.199px] mask-size-[16px_16px]" style={{ maskImage: `url('${imgSideNav5}')` }}>
                        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.2001 13.6006">
                          <g>
                            <path d={svgPaths.p3ae75a00} fill="#B4B4B4" />
                          </g>
                        </svg>
                      </div>
                    </div>
                    {isExpanded && (
                      <div className="flex flex-[1_0_0] flex-col font-['Space_Grotesk',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px relative text-[#b4b4b4] text-[12px] tracking-[0.096px]">
                        <p className="leading-[16px]">Catalog</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2 - Bottom Navigation */}
          <div className={`content-stretch flex flex-col gap-[8px] items-start relative shrink-0 transition-all duration-300 ${isExpanded ? 'w-[176px]' : 'w-full'}`}>
            <div className={`content-stretch flex flex-col gap-[8px] items-start relative shrink-0 ${isExpanded ? 'w-[176px]' : 'w-full'}`}>
              {isExpanded && (
                <div className="h-0 relative shrink-0 w-full">
                  <div className="absolute inset-[-0.25px_-0.14%]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 176.496 0.496">
                      <path d="M0.248 0.248H176.248" opacity="0.4" stroke="url(#paint0_linear_sep4)" strokeLinecap="round" strokeWidth="0.496" />
                      <defs>
                        <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_sep4" x1="176.248" x2="0.248" y1="0.748" y2="0.748">
                          <stop stopColor="#F0F0F0" stopOpacity="0.1" />
                          <stop offset="0.5" stopColor="#F0F0F0" stopOpacity="0.4" />
                          <stop offset="1" stopColor="#F0F0F0" stopOpacity="0.1" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
              )}

              {/* Notification */}
              <div className={`h-[32px] relative rounded-[4px] shrink-0 ${isExpanded ? 'min-w-24.5 w-full' : 'w-full'}`}>
                <div className="flex flex-row items-center justify-center min-w-[inherit] size-full">
                  <div className={`content-stretch flex gap-[4px] items-center min-w-[inherit] relative size-full ${isExpanded ? 'justify-center px-3' : 'justify-center'
                    }`}>
                    <div className="relative shrink-0 size-[16px]">
                      <div className="absolute inset-[6.25%_6.25%_68.75%_68.75%]">
                        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
                          <circle cx="2" cy="2" fill="#E79E2C" r="2" />
                        </svg>
                      </div>
                      <div className="absolute inset-[10%_14.89%_6.64%_14.89%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-[-2.383px_-1.8px] mask-size-[16px_16px]" style={{ maskImage: `url('${imgSideNav6}')` }}>
                        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.234 13.3379">
                          <g>
                            <path d={svgPaths.p3ea53c80} fill="#B4B4B4" />
                          </g>
                        </svg>
                      </div>
                    </div>
                    {isExpanded && (
                      <div className="flex flex-[1_0_0] flex-col font-['Space_Grotesk',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px relative text-[#b4b4b4] text-[12px] tracking-[0.096px]">
                        <p className="leading-[16px]">Notification</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* User Management */}
              <div className={`h-[32px] relative rounded-[4px] shrink-0 ${isExpanded ? 'min-w-24.5 w-full' : 'w-full'}`}>
                <div className="flex flex-row items-center justify-center min-w-[inherit] size-full">
                  <div className={`content-stretch flex gap-[4px] items-center min-w-[inherit] relative size-full ${isExpanded ? 'justify-center px-3' : 'justify-center'
                    }`}>
                    <div className="overflow-clip relative shrink-0 size-[16px]">
                      <div className="absolute inset-[24.12%_10.09%_24.39%_9.34%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-[-1.495px_-4.059px] mask-size-[16px_16px]" style={{ maskImage: `url('${imgSideNav7}')` }}>
                        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.8911 8.23915">
                          <g>
                            <path d={svgPaths.paadd480} fill="#B4B4B4" />
                          </g>
                        </svg>
                      </div>
                    </div>
                    {isExpanded && (
                      <div className="flex flex-[1_0_0] flex-col font-['Space_Grotesk',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px relative text-[#b4b4b4] text-[12px] tracking-[0.096px]">
                        <p className="leading-[16px]">User Management</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Settings */}
              <div className={`h-[32px] relative rounded-[4px] shrink-0 ${isExpanded ? 'min-w-24.5 w-full' : 'w-full'}`}>
                <div className="flex flex-row items-center justify-center min-w-[inherit] size-full">
                  <div className={`content-stretch flex gap-[4px] items-center min-w-[inherit] relative size-full ${isExpanded ? 'justify-center px-3' : 'justify-center'
                    }`}>
                    <div className="bg-[#080e12] content-stretch flex items-center justify-center relative rounded-xs shrink-0 size-[16px]">
                      <div aria-hidden="true" className="absolute border-[#60732b] border-[0.496px] border-solid inset-[-0.248px] pointer-events-none rounded-[2.248px]" />
                      <p className="font-['Space_Grotesk',sans-serif] font-normal leading-3.5 relative shrink-0 text-[#b4b4b4] text-[10px] tracking-[0.208px] whitespace-nowrap">AF</p>
                    </div>
                    {isExpanded && (
                      <div className="flex flex-[1_0_0] flex-col font-['Space_Grotesk',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px relative text-[#b4b4b4] text-[12px] tracking-[0.096px]">
                        <p className="leading-[16px]">Settings</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
