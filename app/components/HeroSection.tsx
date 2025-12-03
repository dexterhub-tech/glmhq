import React from 'react'
import { image } from '../constants/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const HeroSection = () => {
    return (
        <section
            className='w-full min-h-[500px] sm:min-h-[400px] lg:max-h-[700px] xl:max-h-[600px] bg-[#181818] bg-cover bg-center flex justify-center items-center px-2 sm:px-4 md:px-0'
            style={{
                backgroundImage: `url(${image.heroBg.src})`,
                // Use dynamic viewport units for consistent mobile height without JS hacks
                height: 'min(90vh, 90dvh)',
                maxHeight: 'min(90vh, 90dvh)',
            }}
        >
            <div className='w-full px-2 sm:px-4 md:px-5 h-full flex flex-col justify-center text-center items-center mx-auto gap-3 sm:gap-4 md:gap-2'>
                {/* Mobile View - Three lines, uppercase */}
                <h1 className='font-anton text-center font-normal text-white text-[56px] sm:text-[64px] leading-[110%] tracking-normal uppercase md:text-[88px] md:capitalize md:max-w-[707px] mx-auto'>
                    <span className="md:hidden block">
                        JESUS LOVES
                        <br />
                        YOU, YES YOU,
                        <br />
                        EVEN YOU
                    </span>
                    {/* Desktop View - Four lines, Title Case */}
                    <span className="hidden md:flex text-center">
                        Jesus Loves you,
                        <br />
                        yes you, even you
                    </span>
                </h1>
                {/* Mobile View - Two lines */}
                <p className='text-base sm:text-base font-inter font-semibold text-white mt-4 md:mt-2 text-center leading-relaxed'>
                    <span className="md:hidden block">
                        WELCOME TO A PLACE OF INTIMACY,
                        <br />
                        FELLOWSHIP, AND PURPOSE.
                    </span>
                    {/* Desktop View - Single line */}
                    <span className="hidden md:block text-center">
                        WELCOME TO A PLACE OF INTIMACY, FELLOWSHIP, AND PURPOSE.
                    </span>
                </p>
                <Button
                    asChild
                    className='flex items-center gap-[10px] mt-4 sm:mt-8 md:mt-10 w-auto h-[48px] sm:h-[52px] px-5 sm:px-6'
                    style={{
                        borderRadius: '2000px',
                        border: '1px solid #FFFFFF',
                        background: 'rgba(255, 255, 255, 0.09)',
                        paddingTop: '14px',
                        paddingBottom: '14px',
                    }}
                >
                    <Link href="https://wa.me/2349031996431" target="_blank" rel="noopener noreferrer" className="flex items-center gap-[10px]">
                        {/* WhatsApp Icon */}
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_693_787)">
                                <path d="M0.51209 11.8564C0.511527 13.8729 1.04253 15.8418 2.05221 17.5773L0.415527 23.5067L6.53103 21.9157C8.2225 22.8293 10.1177 23.3081 12.0435 23.3082H12.0486C18.4062 23.3082 23.5815 18.1749 23.5842 11.8654C23.5855 8.80804 22.3866 5.93307 20.2084 3.77009C18.0306 1.6073 15.1342 0.41558 12.0481 0.414185C5.68972 0.414185 0.514809 5.54721 0.512184 11.8564" fill="url(#paint0_linear_693_787)" />
                                <path d="M0.100313 11.8527C0.0996563 13.9417 0.649687 15.981 1.69537 17.7786L0 23.9207L6.33478 22.2726C8.08022 23.2168 10.0454 23.7147 12.0451 23.7154H12.0502C18.636 23.7154 23.9972 18.3975 24 11.8621C24.0011 8.69488 22.7591 5.71656 20.5031 3.47609C18.2468 1.23591 15.2468 0.00130233 12.0502 0C5.46337 0 0.102938 5.31721 0.100313 11.8527ZM3.87291 17.469L3.63637 17.0965C2.64206 15.5277 2.11725 13.7149 2.118 11.8534C2.12006 6.4213 6.57544 2.00186 12.054 2.00186C14.7071 2.00298 17.2005 3.02921 19.0759 4.89116C20.9512 6.7533 21.9831 9.22865 21.9824 11.8614C21.98 17.2935 17.5245 21.7135 12.0502 21.7135H12.0463C10.2638 21.7126 8.51569 21.2376 6.99113 20.34L6.62831 20.1265L2.86912 21.1045L3.87291 17.469Z" fill="url(#paint1_linear_693_787)" />
                                <path d="M9.06358 6.89746C8.8399 6.40416 8.60449 6.39421 8.39177 6.38556C8.21758 6.37811 8.01846 6.37867 7.81952 6.37867C7.6204 6.37867 7.29687 6.453 7.0234 6.74928C6.74965 7.04583 5.97827 7.76249 5.97827 9.22007C5.97827 10.6776 7.04824 12.0864 7.1974 12.2843C7.34674 12.4817 9.26299 15.5686 12.2979 16.7562C14.8201 17.743 15.3334 17.5468 15.8808 17.4973C16.4283 17.448 17.6474 16.7808 17.8961 16.089C18.1451 15.3973 18.1451 14.8043 18.0704 14.6804C17.9958 14.557 17.7967 14.4829 17.4981 14.3348C17.1995 14.1867 15.7315 13.4698 15.4578 13.371C15.1841 13.2722 14.985 13.2229 14.7859 13.5195C14.5868 13.8157 14.015 14.4829 13.8407 14.6804C13.6666 14.8785 13.4923 14.9031 13.1938 14.755C12.8951 14.6063 11.9335 14.2938 10.7926 13.2846C9.90499 12.4993 9.30574 11.5296 9.13155 11.2329C8.95737 10.9367 9.1129 10.7762 9.26262 10.6285C9.39677 10.4958 9.5613 10.2826 9.71074 10.1096C9.85962 9.93663 9.9093 9.81318 10.0089 9.6156C10.1085 9.41783 10.0586 9.24481 9.98412 9.09663C9.9093 8.94844 9.32908 7.48323 9.06358 6.89746Z" fill="white" />
                            </g>
                            <defs>
                                <linearGradient id="paint0_linear_693_787" x1="1158.85" y1="2309.67" x2="1158.85" y2="0.414185" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#1FAF38" />
                                    <stop offset="1" stopColor="#60D669" />
                                </linearGradient>
                                <linearGradient id="paint1_linear_693_787" x1="1200" y1="2392.07" x2="1200" y2="0" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#F9F9F9" />
                                    <stop offset="1" stopColor="white" />
                                </linearGradient>
                                <clipPath id="clip0_693_787">
                                    <rect width="24" height="24" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>


                        <span className="text-[#ffffff] font-medium uppercase text-sm whitespace-nowrap">CONNECT WITH US</span>
                    </Link>
                </Button>
            </div>
        </section>
    )
}

export default HeroSection
