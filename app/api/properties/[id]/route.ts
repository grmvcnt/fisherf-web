import {NextResponse} from "next/server";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const id = (await params).id;

        const res = await fetch(`https://preprod-api.notif.immo/documents/properties/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "X-API-KEY": process.env.NEXT_PUBLIC_MELO_API_KEY || "",
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