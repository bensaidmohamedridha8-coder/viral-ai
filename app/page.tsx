"use client";

import { useState } from "react";

export default function Home() {
  const [idea, setIdea] = useState("");
  const [style, setStyle] = useState("Story");
  const [generated, setGenerated] = useState(false);
  const [loading, setLoading] = useState(false);

const generateVideo = async () => {
  if (!idea.trim()) {
    alert("Please enter a video idea first.");
    return;
  }

  setLoading(true);
  setGenerated(false);

  try {
    const response = await fetch("/api/generate-script", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idea,
        style,
      }),
    });

    const data = await response.json();

   if (!response.ok) {
  console.error("API ERROR:", data);
  alert(data.error || "Something went wrong.");
  return;
}

    console.log("AI SCRIPT:", data.script);

    setGenerated(true);
  } catch (error) {
    console.error(error);
    alert("AI generation failed. Check the terminal for the error.");
  } finally {
    setLoading(false);
  }
};

  const scrollToGenerator = () => {
    document
      .getElementById("generator")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 md:px-8 py-6 max-w-7xl mx-auto">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-2xl font-bold"
        >
          <span className="text-purple-400">Viral</span>AI
        </button>

        <div className="hidden md:flex gap-8 text-gray-300">
          <button
            onClick={() =>
              document
                .getElementById("features")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="hover:text-white"
          >
            Features
          </button>

          <button
            onClick={() =>
              document
                .getElementById("pricing")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="hover:text-white"
          >
            Pricing
          </button>

          <button
            onClick={() =>
              document
                .getElementById("about")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="hover:text-white"
          >
            About
          </button>
        </div>

        <button
          onClick={scrollToGenerator}
          className="bg-white text-black px-5 py-2 rounded-xl font-semibold hover:bg-gray-200"
        >
          Get Started
        </button>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 pt-20 md:pt-24 pb-16 text-center">
        <div className="inline-block px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 mb-8">
          ✨ AI Video Creation
        </div>

        <h1 className="text-4xl md:text-7xl font-bold tracking-tight max-w-5xl mx-auto">
          Turn your idea into a
          <span className="text-purple-400"> viral video.</span>
        </h1>

        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mt-6">
          Create TikTok, Instagram Reels and YouTube Shorts with AI.
          Generate scripts, voice, visuals and captions automatically.
        </p>

        <div className="flex justify-center mt-10">
          <button
            onClick={scrollToGenerator}
            className="bg-purple-600 hover:bg-purple-500 px-8 py-4 rounded-xl font-bold text-lg"
          >
            ✨ Create Your Video
          </button>
        </div>
      </section>

      {/* Generator */}
      <section
        id="generator"
        className="max-w-4xl mx-auto px-6 md:px-8 pb-24"
      >
        <div className="bg-gray-950 border border-gray-800 rounded-3xl p-5 md:p-8 shadow-2xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Create your video
          </h2>

          <p className="text-gray-400 mb-6">
            Describe the video you want AI to create.
          </p>

          <textarea
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="Example: A young student starts with $0 and builds a successful online business..."
            className="w-full h-32 bg-black border border-gray-800 rounded-xl p-4 text-white outline-none focus:border-purple-600 resize-none"
          />

          <p className="text-gray-500 text-sm mt-2">
            {idea.length}/500 characters
          </p>

          <div className="flex flex-wrap gap-3 mt-6">
            {["Story", "Motivation", "Horror", "Animals"].map((item) => (
              <button
                key={item}
                onClick={() => setStyle(item)}
                className={`px-4 py-2 rounded-lg transition ${
                  style === item
                    ? "bg-purple-600"
                    : "bg-gray-800 hover:bg-gray-700"
                }`}
              >
                {item === "Story" && "🎬 "}
                {item === "Motivation" && "💰 "}
                {item === "Horror" && "👻 "}
                {item === "Animals" && "🐱 "}
                {item}
              </button>
            ))}
          </div>

          <button
            onClick={generateVideo}
            disabled={loading}
            className="w-full mt-6 bg-purple-600 hover:bg-purple-500 disabled:bg-purple-900 py-4 rounded-xl font-bold text-lg"
          >
            {loading ? "⏳ Creating your video..." : "✨ Generate Video"}
          </button>

          {generated && (
            <div className="mt-8 bg-black border border-purple-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">🎉 Video Ready</h3>
                <span className="text-sm text-purple-400">{style}</span>
              </div>

              <p className="text-gray-400 mb-4">
                Your video idea:
              </p>

              <div className="bg-gray-900 rounded-xl p-4 text-gray-200">
                {idea}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5">
                <div className="bg-gray-900 rounded-xl p-4 text-center">
                  ✍️
                  <p className="text-sm mt-2">Script</p>
                </div>

                <div className="bg-gray-900 rounded-xl p-4 text-center">
                  🎙️
                  <p className="text-sm mt-2">Voice</p>
                </div>

                <div className="bg-gray-900 rounded-xl p-4 text-center">
                  🎬
                  <p className="text-sm mt-2">Visuals</p>
                </div>

                <div className="bg-gray-900 rounded-xl p-4 text-center">
                  💬
                  <p className="text-sm mt-2">Captions</p>
                </div>
              </div>

              <button className="w-full mt-5 border border-gray-700 hover:border-gray-500 py-3 rounded-xl font-semibold">
                Download Video
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="max-w-7xl mx-auto px-6 md:px-8 py-24"
      >
        <div className="text-center mb-14">
          <p className="text-purple-400 font-semibold">POWERFUL AI</p>

          <h2 className="text-4xl md:text-5xl font-bold mt-3">
            Everything you need
          </h2>

          <p className="text-gray-400 mt-4">
            One idea. One click. One complete video.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Feature
            icon="✍️"
            title="AI Script"
            description="Turn a simple idea into an engaging short-form video script."
          />

          <Feature
            icon="🎙️"
            title="AI Voice"
            description="Generate natural-sounding voiceovers for your videos."
          />

          <Feature
            icon="🎬"
            title="Automatic Video"
            description="Combine visuals, voice and captions into a finished video."
          />
        </div>
      </section>

      {/* Pricing */}
      <section
        id="pricing"
        className="max-w-7xl mx-auto px-6 md:px-8 py-24"
      >
        <div className="text-center">
          <p className="text-purple-400 font-semibold">PRICING</p>

          <h2 className="text-4xl md:text-5xl font-bold mt-3">
            Start creating
          </h2>

          <p className="text-gray-400 mt-4">
            Simple plans for creators.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <PriceCard
            name="Free"
            price="$0"
            description="Try the platform"
            features={["1 video", "Basic generation", "Watermark"]}
            onClick={scrollToGenerator}
          />

          <PriceCard
            name="Creator"
            price="$9"
            description="For regular creators"
            features={["30 videos/month", "HD videos", "AI voice", "Captions"]}
            onClick={scrollToGenerator}
          />

          <PriceCard
            name="Pro"
            price="$19"
            description="For serious creators"
            features={[
              "100 videos/month",
              "HD videos",
              "Premium voices",
              "No watermark",
            ]}
            onClick={scrollToGenerator}
          />
        </div>
      </section>

      {/* About */}
      <section
        id="about"
        className="max-w-4xl mx-auto px-6 md:px-8 py-24 text-center"
      >
        <h2 className="text-4xl font-bold">Create faster with AI.</h2>

        <p className="text-gray-400 text-lg mt-5 leading-relaxed">
          ViralAI is designed to turn a simple idea into short-form video
          content without requiring complicated editing software.
        </p>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6 md:px-8 py-24 text-center">
        <div className="bg-gray-950 border border-purple-900 rounded-3xl p-10 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            Your next viral video starts here.
          </h2>

          <p className="text-gray-400 mt-4">
            Turn your idea into a video with AI.
          </p>

          <button
            onClick={scrollToGenerator}
            className="mt-8 bg-purple-600 hover:bg-purple-500 px-8 py-4 rounded-xl font-bold"
          >
            Start Creating
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-900 py-8 text-center text-gray-500">
        © 2026 ViralAI. All rights reserved.
      </footer>
    </main>
  );
}

function Feature({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-gray-950 border border-gray-800 rounded-2xl p-7 hover:border-purple-800 transition">
      <div className="text-4xl">{icon}</div>

      <h3 className="text-xl font-bold mt-5">{title}</h3>

      <p className="text-gray-400 mt-3 leading-relaxed">{description}</p>
    </div>
  );
}

function PriceCard({
  name,
  price,
  description,
  features,
  onClick,
}: {
  name: string;
  price: string;
  description: string;
  features: string[];
  onClick: () => void;
}) {
  return (
    <div className="bg-gray-950 border border-gray-800 rounded-2xl p-7">
      <h3 className="text-2xl font-bold">{name}</h3>

      <p className="text-gray-400 mt-2">{description}</p>

      <div className="text-4xl font-bold mt-6">{price}</div>

      <div className="space-y-3 mt-6">
        {features.map((feature) => (
          <p key={feature} className="text-gray-300">
            ✓ {feature}
          </p>
        ))}
      </div>

      <button
        onClick={onClick}
        className="w-full mt-8 bg-purple-600 hover:bg-purple-500 py-3 rounded-xl font-semibold"
      >
        Get Started
      </button>
    </div>
  );
}
