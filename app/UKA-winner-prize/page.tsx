"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Prize() {
    const [confetti, setConfetti] = useState(false);

    useEffect(() => {
        setConfetti(true);
        const timer = setTimeout(() => setConfetti(false), 5000); // Confetti lasts 5s
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center bg-black text-white font-mono overflow-hidden">
            {/* Confetti */}
            {confetti && (
                <div className="absolute inset-0 pointer-events-none">
                    {Array.from({ length: 150 }).map((_, i) => (
                        <span
                            key={i}
                            className="absolute w-2 h-2 bg-green-400 animate-fall rounded-full"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 3}s`,
                                backgroundColor: `hsl(${Math.random() * 360}, 80%, 60%)`,
                            }}
                        />
                    ))}
                </div>
            )}

            {/* Text */}
            <h1 className="text-5xl font-bold text-green-400 mb-6 text-center">
                🎉 Congratulations! 🎉
            </h1>
            <p className="text-2xl text-zinc-300 text-center">
                You solved the riddle! Here’s your prize:
            </p>

            {/* Prize image */}
            <div className="relative w-96 h-96 sm:w-[600px] sm:h-[600px]">
                <Image
                    src="/prize.PNG"
                    alt="Prize"
                    fill
                    className="object-contain rounded-xl shadow-2xl"
                    priority
                />
            </div>

            <p className="text-xl text-zinc-200 text-center">
                I hope you had fun during UKA! 🏆
            </p>

            {/* Confetti animation */}
            <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-fall {
          animation: fall 3s linear infinite;
        }
      `}</style>
        </div>
    );
}
