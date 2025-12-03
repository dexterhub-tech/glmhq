"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, Pause, SkipBack, SkipForward, Download, ChevronLeft, Volume2, VolumeX } from "lucide-react";

interface Message {
    id: number;
    title: string;
    preacher: string;
    date: string;
    image: string | { src: string; height: number; width: number; blurDataURL?: string; };
    audioUrl: string;
}

export default function MessagePlayer({ message }: { message: Message }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateTime = () => setCurrentTime(audio.currentTime);
        const updateDuration = () => setDuration(audio.duration);
        const onEnded = () => setIsPlaying(false);

        audio.addEventListener("timeupdate", updateTime);
        audio.addEventListener("loadedmetadata", updateDuration);
        audio.addEventListener("ended", onEnded);

        return () => {
            audio.removeEventListener("timeupdate", updateTime);
            audio.removeEventListener("loadedmetadata", updateDuration);
            audio.removeEventListener("ended", onEnded);
        };
    }, []);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const time = parseFloat(e.target.value);
        if (audioRef.current) {
            audioRef.current.currentTime = time;
            setCurrentTime(time);
        }
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseFloat(e.target.value);
        setVolume(val);
        if (audioRef.current) {
            audioRef.current.volume = val;
            setIsMuted(val === 0);
        }
    };

    const toggleMute = () => {
        if (audioRef.current) {
            const newMuted = !isMuted;
            setIsMuted(newMuted);
            audioRef.current.muted = newMuted;
        }
    };

    const formatTime = (time: number) => {
        if (isNaN(time)) return "0:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };

    return (
        <div className="flex flex-col items-center w-full max-w-4xl mx-auto">
            {/* Back Button */}
            <div className="w-full mb-6">
                <Link href="/messages" className="inline-flex items-center text-gray-600 hover:text-black transition-colors">
                    <ChevronLeft className="w-5 h-5 mr-1" />
                    Back to Messages
                </Link>
            </div>

            {/* Main Player Card */}
            <div className="w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                <div className="flex flex-col md:flex-row">
                    {/* Artwork */}
                    <div className="relative w-full md:w-1/2 aspect-square md:aspect-auto md:h-[400px] bg-gray-100">
                        <Image
                            src={message.image}
                            alt={message.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover"
                            priority
                        />
                    </div>

                    {/* Controls Section */}
                    <div className="flex flex-col justify-between p-6 md:p-8 w-full md:w-1/2 bg-white">
                        <div>
                            <h1 className="font-anton text-2xl md:text-3xl lg:text-4xl text-black mb-2 leading-tight">
                                {message.title}
                            </h1>
                            <div className="flex flex-col gap-1 mb-6">
                                <span className="font-satoshi font-medium text-lg text-gray-700">{message.preacher}</span>
                                <span className="font-satoshi text-gray-500">{message.date}</span>
                            </div>
                        </div>

                        {/* Audio Controls */}
                        <div className="flex flex-col gap-4">
                            {/* Progress Bar */}
                            <div className="w-full">
                                <input
                                    type="range"
                                    min="0"
                                    max={duration || 0}
                                    value={currentTime}
                                    onChange={handleSeek}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                />
                                <div className="flex justify-between text-xs font-medium text-gray-500 mt-1">
                                    <span>{formatTime(currentTime)}</span>
                                    <span>{formatTime(duration)}</span>
                                </div>
                            </div>

                            {/* Main Buttons */}
                            <div className="flex items-center justify-center gap-6 mt-2">
                                <button className="text-gray-400 hover:text-black transition-colors">
                                    <SkipBack className="w-8 h-8" />
                                </button>

                                <button
                                    onClick={togglePlay}
                                    className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-transform active:scale-95 shadow-lg"
                                >
                                    {isPlaying ? (
                                        <Pause className="w-8 h-8 fill-current" />
                                    ) : (
                                        <Play className="w-8 h-8 fill-current ml-1" />
                                    )}
                                </button>

                                <button className="text-gray-400 hover:text-black transition-colors">
                                    <SkipForward className="w-8 h-8" />
                                </button>
                            </div>

                            {/* Secondary Controls */}
                            <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-100">
                                <div className="flex items-center gap-2 group">
                                    <button onClick={toggleMute} className="text-gray-400 group-hover:text-black transition-colors">
                                        {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                                    </button>
                                    <input
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.01"
                                        value={isMuted ? 0 : volume}
                                        onChange={handleVolumeChange}
                                        className="w-20 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-600"
                                    />
                                </div>

                                <a
                                    href={message.audioUrl}
                                    download
                                    className="flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold text-sm transition-colors bg-green-50 px-4 py-2 rounded-full"
                                >
                                    <Download className="w-4 h-4" />
                                    <span>Download MP3</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <audio ref={audioRef} src={message.audioUrl} preload="metadata" />
        </div>
    );
}
