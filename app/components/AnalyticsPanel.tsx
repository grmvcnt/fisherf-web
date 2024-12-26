import { priceLabel } from "@/utils/formats/label";
import { PropertyAnalysisType, SimilarPropertyAnalysis } from "@/utils/types/property";
import { useEffect, useState, useMemo } from "react";

function getSurfaceRange(surface: number): [number, number] {
    return [surface - 5, surface + 5];
}

function encodeQueryParams({ city, room, surface }: PropertyAnalysisType): string {
    const [surfaceMin, surfaceMax] = getSurfaceRange(surface);

    return new URLSearchParams({
        "includedZipcodes[]": city.zipcode.toString(),
        roomMin: room.toString(),
        roomMax: room.toString(),
        surfaceMin: surfaceMin.toString(),
        surfaceMax: surfaceMax.toString(),
    }).toString();
}

function calculateAveragePricePerMeter(similarProperties: SimilarPropertyAnalysis[]): number {
    let result = 0;
    similarProperties.forEach(property => {
        result += property.pricePerMeter;
    })
    result = Math.round(result / similarProperties.length);
    return result;
}

function calculateAveragePrice(pricePerMeter: number, surface: number): number {
    return pricePerMeter * surface;
}

export default function AnalyticsPanel({
   data,
   isLoading,
}: {
    data: PropertyAnalysisType;
    isLoading: boolean;
}) {
    const [similarProperties, setSimilarProperties] = useState<SimilarPropertyAnalysis[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isCalculating, setIsCalculating] = useState<boolean>(false);

    const averagePricePerMeter = useMemo(() => {
        setIsCalculating(true);
        const result = calculateAveragePricePerMeter(similarProperties);
        setIsCalculating(false);
        return result;
    }, [similarProperties]);

    const averagePrice = useMemo(() => {
        setIsCalculating(true);
        const result = calculateAveragePrice(averagePricePerMeter, data.surface);
        setIsCalculating(false);
        return result;
    }, [averagePricePerMeter, data.surface]);

    useEffect(() => {
        if (isLoading) return;

        const fetchSimilarProperties = async () => {
            try {
                const queryParams = encodeQueryParams(data);
                const res = await fetch(`/api/properties/similar/${queryParams}`);

                if (!res.ok) throw new Error(`Erreur HTTP: ${res.status}`);

                const result = await res.json();
                setSimilarProperties(result["hydra:member"]);
            } catch (err: any) {
                setError(err.message);
            }
        };

        fetchSimilarProperties();
    }, [data, isLoading]);

    if (error) return <div>Erreur: {error}</div>;

    return (
        <div className="border p-2">
            <h2 className="mb-2">Panneau Analytique</h2>
            {isLoading || isCalculating ? (
                "Chargement..."
            ) : (
                <div className="flex flex-col gap-2">
                    <div>
                        <h3>Informations du bien sélectionné</h3>
                        <p>Code Postal : {data.city.zipcode}</p>
                        <p>Nombre de Pièces : {data.room}</p>
                        <p>Surface : {data.surface}m²</p>
                        <p>Prix : {priceLabel(data.price)}</p>
                    </div>
                    <div>
                        <h3>Éstimation de rendement locatif</h3>
                        <p>{averagePricePerMeter ? `${priceLabel(averagePricePerMeter)}/m²` : "Non disponible"}</p>
                        <p>{averagePrice ? `${priceLabel(averagePrice)}` : "Non disponible"}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
