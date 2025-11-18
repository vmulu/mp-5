// validating user input

import { NextResponse } from "next/server";
import getCollection, { LINKS_COLLECTION } from "@/db";

// check if url is valid
function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    const isHttp = parsed.protocol === "http:";
    const isHttps = parsed.protocol === "https:";
    return isHttp || isHttps;
  } catch {
    return false;
  }
}

// handling http post request
export async function POST(req: Request) {
  try {
    const { url, alias } = await req.json();

    // if url & alias not given trow 400
    if (!url || !alias) {
      return NextResponse.json(
        { error: "Please enter a alias and URL" },
        { status: 400 },
      );
    }

    // if url is not valid throw 400
    if (!isValidUrl(url)) {
      return NextResponse.json(
        { error: "Url is not valid." },
        { status: 400 },
      );
    }

    const collection = await getCollection(LINKS_COLLECTION);
    const existing = await collection.findOne({ alias });

    // if url already exists in db throw 400
    if (existing) {
      return NextResponse.json(
        { error: "Please pick another alias. This alias is already taken" },
        { status: 409 },
      );
    }

    await collection.insertOne({ alias, url, createdAt: new Date() });

    // successful input
    return NextResponse.json(
      { shortUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/${alias}` },
      { status: 201 },
    );

  } catch (err) {

    console.error("Error /api/shortenUrl:", err);

    return NextResponse.json(
      { error: "Server error. Please try again." },
      { status: 500 },
    );
  }
}

