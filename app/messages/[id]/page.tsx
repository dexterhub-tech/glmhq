import React from "react";
import { notFound } from "next/navigation";
import { messages } from "../../constants/messages";
import MessagePlayer from "../../components/MessagePlayer";

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export function generateStaticParams() {
    return messages.map((message) => ({
        id: message.id.toString(),
    }));
}

export default async function MessagePage({ params }: PageProps) {
    const resolvedParams = await params;
    const messageId = parseInt(resolvedParams.id);
    const message = messages.find((m) => m.id === messageId);

    if (!message) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-gray-50 py-8 md:py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-8 md:mb-12">
                    <h1 className="font-anton text-3xl md:text-4xl lg:text-5xl text-black mb-4 capitalize">
                        Listen To Life Transforming Messages
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Immerse yourself in powerful teachings that will uplift your spirit and transform your life.
                    </p>
                </div>

                <MessagePlayer message={message} />
            </div>
        </main>
    );
}
