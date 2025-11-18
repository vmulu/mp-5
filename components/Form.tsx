// form component for user to input url and alias

"use client";
import { useState } from "react";

export default function Form() {
  const [alias, setAlias] = useState("");
  const [url, setUrl] = useState("");
  const [result, setResult] = useState("");

  // fetching url
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/shortenUrl", {
      method: "POST",
      body: JSON.stringify({ alias, url }),
    });

    const data = await res.json();
    setResult(data.shortUrl || data.error);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-[#f6cacd] p-6 rounded-md shadow-md text-[#450920] font-sans w-[90%] max-w-md mx-auto"
    >
      {/* url input */}
      <input
        className="p-2 border border-[#450920] rounded-md focus:outline-none focus:ring focus:ring-[#450920]/50"
        placeholder="Enter URL"
        onChange={(e) => setUrl(e.target.value)}
      />

      {/* alias input */}
      <input
        className="p-2 border border-[#450920] rounded-md focus:outline-none focus:ring focus:ring-[#450920]/50"
        placeholder="Enter alias"
        onChange={(e) => setAlias(e.target.value)}
      />

      {/* submit button */}
      <button
        type="submit"
        className="bg-[#450920] hover:bg-[#5a102b] text-[#f6cacd] p-2 rounded-md font-medium"
      >
        Shorten URL
      </button>

      {result && (<p className="text-center text-sm mt-2 font-medium"> {result} </p>)}
    </form>
  );
}

