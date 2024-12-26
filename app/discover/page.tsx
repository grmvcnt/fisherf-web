'use client';

import {FormEvent, useEffect, useState} from "react";
import PropertyCard from "@/app/components/PropertyCard";
import {PropertyType} from "@/utils/types/property";
import AnalyticsPanel from "@/app/components/AnalyticsPanel";
import {updateFilters} from "@/app/actions/filters/actions";
import Filters from "@/app/components/Filters";

export default function Discover() {
  const [properties, setProperties] = useState<null | PropertyType[]>(null);
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);
  const [property, setProperty] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const [loadingAnalytics, setLoadingAnalytics] = useState<boolean>(false);
  const [loadingFilters, setLoadingFilters] = useState<boolean>(false);
  const [filters, setFilters] = useState({
    budgetMin: 100000,
    budgetMax: 1000000,
  });

  useEffect(() => {
    async function fetchProperties() {
      try {
        const res = await fetch("/api/properties");
        const result = await res.json();
        setProperties(result['hydra:member']);
      } catch (error) {
        let message = 'Erreur Inconnu';
        if (error instanceof Error) message = error.message;
        setError(message);
      }
    }

    fetchProperties();
  }, []);

  useEffect(() => {
    async function fetchProperty() {
      try {
        setLoadingAnalytics(true);
        const res = await fetch(`/api/properties/${selectedProperty}`);
        const result = await res.json();
        setProperty(result);
        setLoadingAnalytics(false);
      } catch (error) {
        let message = 'Erreur Inconnu';
        if (error instanceof Error) message = error.message;
        setError(message);
        setLoadingAnalytics(false);
      }
    }

    if(selectedProperty) fetchProperty();
  }, [selectedProperty]);

  const handleOnSubmitFilters = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setLoadingFilters(true);
      const { properties } = await updateFilters(filters);
      setProperties(properties);
      setProperty(null);
      setLoadingFilters(false);
    } catch (error) {
      let message = 'Erreur Inconnu';
      if (error instanceof Error) message = error.message;
      setError(message);
      setLoadingFilters(false);
    }
  };

  if (error) return <div>Erreur: {error}</div>;
  if (!properties) return <div>Chargement...</div>;

  return (
      <div className="flex flex-grow flex-col gap-4">
        <h2>Propriétés</h2>
        <div className="flex justify-start items-center gap-2">
          <Filters
            values={filters}
            setValues={setFilters}
            onSubmit={handleOnSubmitFilters}
          />
        </div>
        {loadingFilters ? 'Chargement...' : (
          <div className="flex-grow grid grid-cols-[1fr_40%] grid-rows-[1fr] gap-2">
            <div className="grid grid-cols-2 gap-2">
              {properties.map((property, key) => (
                <PropertyCard
                  key={key}
                  data={property}
                  onPropertyCardClick={(e) => setSelectedProperty(e.currentTarget.id)}
                  isSelected={selectedProperty === property.uuid}
                />
              ))}
            </div>
            {!property ? null : (
              <div>
                <AnalyticsPanel data={property} isLoading={loadingAnalytics}/>
              </div>
            )}
          </div>
        )}
      </div>
  );
}
