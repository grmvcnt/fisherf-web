import { NextResponse } from "next/server";

export async function GET() {
    try {
        const res = await fetch("https://preprod-api.notif.immo/documents/properties?transactionType=0&withCoherentPrice=true", {
            headers: {
                "Content-Type": "application/json",
                "X-API-KEY": process.env.MELO_API_KEY || "",
            },
            method: "GET",
        });

        if (!res.ok) {
            return NextResponse.json({ error: "Failed to fetch data from external API" }, { status: res.status });
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        let message = 'Unknown Error'
        if (error instanceof Error) message = error.message
        throw new Error(message);
    }
}