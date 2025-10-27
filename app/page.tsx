"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();

    const encodedRiddle =
        "Whkx qs gjzkxzj xhkn gbd, mbjz zvql xhkn skxkn, xhz pbbj hkvz qx, xhz jqch nzzd qx, knd qf ybu zkx qx....ybu dqz?";

    const letterHints = [
        { from: "k", to: "A" },
        { from: "x", to: "T" },
        { from: "z", to: "E" },
        { from: "q", to: "I" },
        { from: "b", to: "O" },
        { from: "j", to: "R" },
    ];




    const [revealed, setRevealed] = useState<number[]>([]);
    const [answer, setAnswer] = useState("");
    const [error, setError] = useState(false);

    const revealHint = (index: number) => {
        if (!revealed.includes(index)) {
            setRevealed([...revealed, index]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (answer.trim().toLowerCase() === "nothing") {
            router.push("/UKA-winner-prize");
        } else {
            setError(true);
            setTimeout(() => setError(false), 600);
        }
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center bg-black text-white font-mono overflow-hidden">
            <main className="flex flex-col items-center justify-center px-8 text-center max-w-2xl z-10">
                <h1 className="text-4xl font-bold mb-8 tracking-wide text-zinc-100">
                    🕵️‍♀️ The Cipher Challenge 🕵️‍♂️
                </h1>

                <p className="text-lg text-zinc-400 mb-4">
                    Welcome, brave bartender! Hidden within these nonsense words lies a riddle.
                    Decipher the letters to reveal it.
                </p>

                <div className="bg-zinc-900 text-zinc-200 rounded-xl p-6 mt-6 shadow-md border border-zinc-700">
                    <p className="whitespace-pre-wrap text-lg leading-relaxed">
                        {encodedRiddle}
                    </p>
                </div>

                <p className="text-sm text-zinc-500 mt-6 italic">
                    Hint: Take a look around the website, there may be something hiding in the shadows...
                </p>

                {/* Answer input */}
                <form
                    onSubmit={handleSubmit}
                    className={`mt-12 flex flex-col sm:flex-row gap-3 items-center transition-transform ${
                        error ? "animate-shake" : ""
                    }`}
                >
                    <input
                        type="text"
                        placeholder="Type your answer..."
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        className="px-4 py-2 rounded-md bg-white text-black w-56 text-center outline-none border border-zinc-500 focus:border-zinc-300 focus:ring-2 focus:ring-zinc-400 transition"
                    />
                    <button
                        type="submit"
                        className="rounded-md bg-zinc-100 text-black px-5 py-2 font-semibold hover:bg-zinc-300 transition"
                    >
                        Submit
                    </button>
                </form>

                {error && (
                    <p className="text-red-500 mt-3 text-sm">
                        ❌ That’s not it. Try again!
                    </p>
                )}
            </main>

            {/* Visible Easter Egg Hints */}
            {letterHints.map((hint, index) => {
                // Define fixed positions for each hint
                const positions = [
                    { top: "5%", left: "5%" }, // top-left corner
                    { top: "5%", right: "5%" }, // top-right corner
                    { bottom: "10%", left: "10%" }, // bottom-left
                    { bottom: "10%", right: "10%" }, // bottom-right
                    { top: "30%", left: "50%", transform: "translateX(-50%)" }, // over title
                    { top: "70%", left: "50%", transform: "translateX(-50%)" }, // lower middle
                ];

                const pos = positions[index % positions.length];

                return (
                    <button
                        key={index}
                        onClick={() => revealHint(index)}
                        className={`
        fixed opacity-5 hover:opacity-100 transition-opacity duration-300
        text-sm text-zinc-400 border border-zinc-600 px-2 py-1 rounded-md
        hover:text-white hover:border-zinc-300 bg-zinc-800/40 backdrop-blur-sm z-50
      `}
                        style={pos}
                    >
                        🔒
                        {revealed.includes(index) && (
                            <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 bg-zinc-800 text-zinc-200 px-2 py-1 rounded text-xs border border-zinc-700">
          {hint.from} → {hint.to}
        </span>
                        )}
                    </button>
                );
            })}

            {/* Shake animation */}
            <style jsx>{`
                @keyframes shake {
                    0%,
                    100% {
                        transform: translateX(0);
                    }
                    20%,
                    60% {
                        transform: translateX(-10px);
                    }
                    40%,
                    80% {
                        transform: translateX(10px);
                    }
                }
                .animate-shake {
                    animation: shake 0.5s ease;
                }
            `}</style>
        </div>
    );
}
