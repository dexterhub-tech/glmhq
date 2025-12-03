import React from 'react'
import { image } from '../constants/image'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { MapPin } from 'lucide-react'

const PROGRAMS = [
    {
        img: image.ascend,
        date: 'THIS SUNDAY',
        title: 'ASCEND SERVICE',
        time: '8AM',
        desc: 'Join us as we learn, pray, and ascend to the 3rd heavens in worship. Make it a date with God.',
    },
    {
        img: image.auxano,
        date: 'THIS WEDNESDAY',
        title: 'AIONOIS SERVICE',
        time: '5PM',
        desc: 'The Eternal life God is a life that has no beginning or ending. Join us as we explore this life of God..',
    },
    {
        img: image.takeit,
        date: 'FIRST SATURDAY OF EVERY MONTH',
        title: 'TAKE-IT',
        time: '8AM',
        desc: 'Are you in need of healing, deliverance, finance, breakthrough? Come lay hold on heaven\'s provision',
    },
]

const UpcomingPgSection = () => {
    return (
        <section id="meetings" className="w-full flex flex-col items-center py-6 sm:py-10 md:py-16 px-3 sm:px-4 md:px-6 lg:px-8">
            <h2 className="font-anton text-2xl sm:text-3xl md:text-4xl text-[#181818] mb-6 sm:mb-8 md:mb-12 text-center px-2">Fellowship With Us</h2>
            <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                {PROGRAMS.map((p,) => (
                    <div key={p.title} className="bg-[#F3F3F3] rounded-xl flex flex-col overflow-hidden">
                        <div className="w-full h-40 sm:h-48 relative">
                            <Image src={p.img} alt={p.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover w-full h-full rounded-t-xl" />
                        </div>
                        <div className="p-3 sm:p-4 md:p-6 flex flex-col gap-2">
                            <span className="text-xs sm:text-xs font-inter text-[#181818] mb-1">{p.date}</span>
                            <span className="font-anton text-lg sm:text-xl md:text-2xl text-[#181818]">
                                {p.title} <span className="text-[#D00002] font-bold">| {p.time}</span>
                            </span>
                            <span className="text-xs sm:text-sm font-inter text-[#181818] mt-1">{p.desc}</span>
                        </div>
                    </div>
                ))}
            </div>
            <Button asChild className="mt-6 sm:mt-10 md:mt-12 bg-[#000000] text-white rounded-full px-5 py-3 sm:px-6 sm:py-4 md:px-8 md:py-5 text-sm sm:text-base md:text-lg flex items-center gap-2 shadow-md hover:bg-[#181818]/90">
                <a href="https://www.google.com/maps/place/Gospel+Labour+Ministry/@7.6476611,5.2275751,17z/data=!3m1!4b1!4m6!3m5!1s0x1047f00e7d3788d5:0x6f5d4c61c254e94d!8m2!3d7.6476611!4d5.23015!16s%2Fg%2F11pb1zl8yn?entry=ttu&g_ep=EgoyMDI1MTEyMy4xIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    GET CHURCH ADDRESS
                </a>
            </Button>
        </section>
    )
}

export default UpcomingPgSection
