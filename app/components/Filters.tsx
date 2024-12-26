import {ChangeEvent} from "react";
import {FiltersPropsType, FiltersType} from "@/utils/types/filters";

export default function Filters({values, setValues, onSubmit}: FiltersPropsType) {
    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValues((prev: FiltersType) => ({
            ...prev,
            [e.target.name]: Number(e.target.value),
        }));
    };

    return (
        <form
            className="flex flex-col gap-2"
            onSubmit={onSubmit}
        >
            <p>Filtres :</p>
            <div className="flex justify-start items-center gap-2">
                <label htmlFor="minBudget">Budget min.</label>
                <input
                    id="budgetMin"
                    name="budgetMin"
                    type="number"
                    className="bg-background border border-foreground pl-2"
                    placeholder="budget minimum"
                    value={values.budgetMin}
                    onChange={handleOnChange}
                />
            </div>
            <div className="flex justify-start items-center gap-2">
                <label htmlFor="maxBudget">Budget max.</label>
                <input
                    id="budgetMax"
                    name="budgetMax"
                    type="number"
                    className="bg-background border border-foreground pl-2"
                    placeholder="budget maximum"
                    value={values.budgetMax}
                    onChange={handleOnChange}
                />
            </div>
            <button type="submit" className="border px-2">Rechercher</button>
        </form>
    )
}