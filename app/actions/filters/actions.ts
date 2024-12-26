'use server'

import {FiltersType} from "@/utils/types/filters";

export async function updateFilters(formData: FiltersType) {
    const { budgetMin, budgetMax } = formData;

    try {
        const res = await fetch(
            `https://preprod-api.notif.immo/documents/properties?transactionType=0&withCoherentPrice=true&budgetMin=${budgetMin}&budgetMax=${budgetMax}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-API-KEY": process.env.NEXT_PUBLIC_MELO_API_KEY || "",
                },
                method: "GET",
            }
        );

        if (!res.ok) {
            throw new Error("Failed to fetch data from external API");
        }

        const data = await res.json();

        return {
            properties: data["hydra:member"] || [],
        };
    } catch (error: any) {
        throw new Error(error.message || "Internal Server Error");
    }
}