import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { queryParams: string } }) {
    try {
        const queryParams = (await params).queryParams;

        console.log("Query Params:", queryParams);

        const res = await fetch(`https://preprod-api.notif.immo/documents/properties?transactionType=1&withCoherentPrice=true&${queryParams}`, {
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
    } catch (error: any) {
        return NextResponse.json({ error: "Internal Server Error", message: error.message }, { status: 500 });
    }
}
