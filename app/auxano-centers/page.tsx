import Image from "next/image";
import auxanoCentersHeader from "../assets/images/auxano_centers_header.png";
import eksuImage from "../assets/images/eksu.png";
import fpadoImage from "../assets/images/fpado.png";
import corpersImage from "../assets/images/corpers.png";

export default function AuxanoCentersPage() {
    const centers = [
        {
            name: "EKITI STATE UNIVERSITY (EKSU)",
            location: "lle-Eye Lecture Theatre, Ekiti State University, Ado-Ekiti, Nigeria",
            schedule: "Mondays & Thursdays",
            time: "5PM",
            image: eksuImage
        },
        {
            name: "FEDERAL POLYTECHNIC ADO-EKITI (MAIN CAMPUS)",
            location: "A2-005, Old SBS Building, Federal Polytechnic Main Campus, Ado-Ekiti, Nigeria",
            schedule: "Sundays: 4PM || Thursdays: ",
            time: "5PM",
            image: fpadoImage
        },
        {
            name: "CORPER'S MISSION",
            location: "Ekiti Parapo Pavilion, New Iyin Road (Bank Road), Ado-Ekiti, Nigeria",
            schedule: "Tuesdays, Wednesdays, Thursdays",
            time: "8:45AM",
            image: corpersImage
        },
        {
            name: "COLLEGE OF NURSING (CONAD)",
            location: "The-Rock Tutorial Center, Beside SLOT, Adebayo, Ado-Ekiti, Nigeria.",
            schedule: "Thursdays",
            time: "5PM",
            image: eksuImage
        },
        {
            name: "FEDERAL UNIVERSITY OYE (IDO CAMPUS)",
            location: "Newly opened Lecture Hall 2, FUOYE, Ido Campus, Ido-Ekiti, Nigeria",
            schedule: "Mondays & Thursdays",
            time: "4:30PM",
            image: eksuImage
        },
        {
            name: "ADO-EKITI TOWNSHIP",
            location: "Upper Room (GLM Auditorium), Off Housing Road, Olora Layout, Adebayo, Ado Ekiti.",
            schedule: "Sundays",
            time: "8:00AM",
            image: eksuImage
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative w-full h-[400px] md:h-[500px] pt-[72px]">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <Image
                        src={auxanoCentersHeader}
                        alt="Auxano Centers Hero"
                        fill
                        className="object-cover"
                        priority
                    />
                    {/* Overlay for better text readability */}
                    <div className="absolute inset-0 bg-black/30"></div>
                </div>

                {/* Hero Content */}
                <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center">
                    <h1 className="font-anton text-4xl md:text-6xl lg:text-7xl text-white leading-tight mb-4">
                        TOWARDS SPIRITUAL
                    </h1>
                    <h2 className="font-anton text-4xl md:text-6xl lg:text-7xl text-[#00FF00] leading-tight mb-6">
                        GROWTH AND MATURITY
                    </h2>
                    <p className="font-inter text-sm md:text-base text-white uppercase tracking-wider max-w-2xl">
                        AUXANO IS AN ARM OF THE CHURCH DEDICATED TO MENTORING AND NURTURING
                    </p>
                </div>
            </section>

            {/* Centers Grid Section */}
            <section className="w-full px-4 py-12 md:py-16 lg:py-20">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {centers.map((center, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                            >
                                {/* Center Image */}
                                <div className="relative w-full h-48 bg-gray-200">
                                    <Image
                                        src={center.image}
                                        alt={center.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                {/* Card Content */}
                                <div className="p-6">
                                    {/* Center Name */}
                                    <h3 className="font-bold text-base md:text-lg text-black uppercase mb-4 leading-tight">
                                        {center.name}
                                    </h3>

                                    {/* Location */}
                                    <div className="flex items-start gap-2 mb-3">
                                        <svg
                                            className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                        </svg>
                                        <p className="text-sm text-gray-700 leading-snug">
                                            {center.location}
                                        </p>
                                    </div>

                                    {/* Schedule */}
                                    <div className="flex items-start gap-2 mb-4">
                                        <svg
                                            className="w-5 h-5 flex-shrink-0 mt-0.5"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path fillRule="evenodd" clipRule="evenodd" d="M4 4.018C3.46 4.041 3.072 4.092 2.729 4.208C2.14238 4.40442 1.60932 4.73422 1.17171 5.17148C0.734106 5.60874 0.403882 6.14154 0.207 6.728C1.49012e-08 7.349 0 8.115 0 9.649C0 9.744 1.11759e-08 9.792 0.013 9.83C0.0252768 9.86679 0.0459435 9.90021 0.0733657 9.92763C0.100788 9.95506 0.134214 9.97572 0.171 9.988C0.209 10.001 0.257 10.001 0.353 10.001H17.647C17.743 10.001 17.791 10.001 17.829 9.988C17.8658 9.97572 17.8992 9.95506 17.9266 9.92763C17.9541 9.90021 17.9747 9.86679 17.987 9.83C18 9.791 18 9.743 18 9.647C18 8.114 18 7.347 17.793 6.729C17.5964 6.14217 17.2663 5.60897 16.8287 5.17135C16.391 4.73372 15.8578 4.40362 15.271 4.207C14.928 4.092 14.539 4.041 14 4.018V6.5C14 6.89782 13.842 7.27936 13.5607 7.56066C13.2794 7.84196 12.8978 8 12.5 8C12.1022 8 11.7206 7.84196 11.4393 7.56066C11.158 7.27936 11 6.89782 11 6.5V4H7V6.5C7 6.89782 6.84196 7.27936 6.56066 7.56066C6.27936 7.84196 5.89782 8 5.5 8C5.10218 8 4.72064 7.84196 4.43934 7.56066C4.15804 7.27936 4 6.89782 4 6.5V4.018Z" fill="#D00002" />
                                            <path d="M0 11.5C0 11.264 -4.47035e-08 11.146 0.073 11.073C0.146 11 0.264 11 0.5 11H17.5C17.736 11 17.854 11 17.927 11.073C18 11.146 18 11.264 18 11.5V12C18 15.771 18 17.657 16.828 18.828C15.656 19.999 13.771 20 10 20H8C4.229 20 2.343 20 1.172 18.828C0.000999928 17.656 0 15.771 0 12V11.5Z" fill="#F36D6D" fillOpacity="0.4" />
                                            <path d="M5.5 2.5V6.5M12.5 2.5V6.5" stroke="#D00002" strokeLinecap="round" />
                                        </svg>
                                        <p className="text-sm text-gray-700 leading-snug">
                                            <span className="font-semibold">{center.schedule}</span>
                                            {center.time && <span className="ml-1 text-[#D00002] font-semibold">{center.time}</span>}
                                        </p>
                                    </div>

                                    {/* Ask for Directions Button */}
                                    <button className="w-3/5 md:w-auto flex items-center justify-center gap-2 bg-white border-2 border-black text-black font-semibold py-2.5 px-4 rounded-full hover:bg-black hover:text-white transition-colors duration-200 whitespace-nowrap">
                                        <svg
                                            className="w-4 h-4 flex-shrink-0"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                        </svg>
                                        <span className="text-sm">Ask for directions</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
