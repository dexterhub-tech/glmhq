import Image from "next/image";
import heroImage from "../assets/images/auxano_centers_header.png";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] pt-[72px]">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <Image
                        src={heroImage}
                        alt="Gospel Labour Ministry Congregation"
                        fill
                        className="object-cover"
                        priority
                    />
                    {/* Darker overlay for better text contrast */}
                    <div className="absolute inset-0 bg-black/50"></div>
                </div>

                {/* Hero Content */}
                <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center">
                    <h1 className="font-anton text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white leading-tight max-w-5xl uppercase">
                        This is whom God has made us,<br />a chosen generation
                    </h1>
                </div>
            </section>

            {/* Main Content Section */}
            <section className="w-full px-4 py-12 md:py-16 lg:py-20">
                <div className="max-w-7xl mx-auto">
                    {/* Two Column Layout: Heading on Left, Content on Right */}
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 lg:gap-16 xl:gap-20">
                        {/* Left Column: Main Heading (Sticky on Desktop) */}
                        <div className="lg:sticky lg:top-24 lg:self-start">
                            <h2 className="font-anton text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-black uppercase leading-tight">
                                Who we are<br />as a church
                            </h2>
                        </div>

                        {/* Right Column: Content Blocks */}
                        <div className="space-y-10 md:space-y-12">
                            {/* THE CHURCH */}
                            <div>
                                <p className="mb-10">Gospel Labour Ministry is an Apostolic movement with a mandate to raise believers who are well equipped to represent God in different spheres of life. Here, there&apos;s no feeble one among us.
                                    We strongly believe spiritual growth and discipleship is a roadmap to the harvest God is sending us into. And God has found us worthy by his grace to send us into His harvest.
                                </p>

                                <h3 className="font-anton text-base md:text-lg text-black uppercase mt-4 mb-3 tracking-wide">
                                    THE CHURCH
                                </h3>
                                <p className="font-inter text-sm md:text-base text-gray-800 leading-relaxed">
                                    We believe the church is God&apos;s ultimate plan for the time we live in. We&apos;re a church on a mission, and nothing can stop us. Just like the ark of Noah, the church is God&apos;s safe harbor for everyone. Irrespective of what people are facing outside this ark, God Has prepared a safe place to shelter men from the danger, wickedness and decay of the last days.
                                </p>
                                <p className="font-inter text-sm md:text-base text-gray-800 leading-relaxed mt-3">
                                    <strong>This is Church....I Love it</strong>

                                </p>
                                <p className="mt-4">Matthew 9:37-38</p>

                                <p>Then saith he unto his disciples, The harvest truly is plenteous, but the labourers are few; Pray ye therefore the Lord of the harvest, that he will send forth labourers into his harvest.</p>
                            </div>

                            {/* GLM: GOD'S CHOICE */}
                            <div>
                                <h3 className="font-anton text-base md:text-lg text-black uppercase mb-3 tracking-wide">
                                    GLM: GOD&apos;S CHOICE
                                </h3>
                                <p className="font-inter text-sm md:text-base text-gray-800 leading-relaxed">
                                    We are chosen by grace, appointed by love and sent into the ready harvest of God in these last days. God is simply doing His work through us. We are His new Sharp threshing instrument, with us, He is threshing mountains and beating them small.
                                    God has not called us to labour or work apart from Him, but that we should enter into everything He Has prepared for us in Christ.
                                </p>
                                <p className="font-inter text-sm md:text-base text-gray-800 leading-relaxed mt-3">
                                    This generation shall be equipped to represent God in all different sphere of life and we honour him and everything He has prepared for us in Christ.
                                </p>
                            </div>

                            {/* THE MANDATE */}
                            <div>
                                <h3 className="font-anton text-base md:text-lg text-black uppercase mb-3 tracking-wide">
                                    THE WORD: OUR VERY LIFE
                                </h3>
                                <p className="font-inter text-sm md:text-base text-gray-800 leading-relaxed">
                                    At GLM, we hold the word of God in high esteem and we believe that it is God&apos;s tool of making and working both in us and through us. Our ministry is that of the word and everything we do revolves round this.

                                </p>
                            </div>

                            {/* WORSHIP */}
                            <div>
                                <h3 className="font-anton text-base md:text-lg text-black uppercase mb-3 tracking-wide">
                                    WORSHIP
                                </h3>
                                <p className="font-inter text-sm md:text-base text-gray-800 leading-relaxed">
                                    At GLM, worship is another great tool God Has given us to reach this generation. For us, worship is not just what we do, it&apos;s one of the major reasons why we are here, it&apos;s our life.
                                </p>
                            </div>

                            {/* THE LOVE OF GOD */}
                            <div>
                                <h3 className="font-anton text-base md:text-lg text-black uppercase mb-3 tracking-wide">
                                    THE LOVE OF GOD
                                </h3>
                                <p className="font-inter text-sm md:text-base text-gray-800 leading-relaxed">
                                    If you say Gospel Labour Ministry means God Loves Me, you&apos;re right because one of the things we enjoy without reservations at GLM is the Love of God. God loves us so much and we know it!
                                </p>
                                <p className="mt-4">He calls</p>
                                <p>He sends</p>
                                <p>He works in the called to bring to naught things that exists and to make manifest things unseen.</p>
                            </div>


                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
