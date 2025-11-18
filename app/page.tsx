// entry point of application with form component

import Form from "@/components/Form";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center bg-[#f6cacd] text-[#450920] p-6 font-sans text-center h-screen">
      <h1 className="text-3xl font-bold mb-2">
        URL Shortener
      </h1>
      <p className="text-lg font-medium">
        Shorten your long URLs into compact, shareable links
      </p>
      <Form />
    </div>
  );
}
