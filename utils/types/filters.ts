import {FormEvent} from "react";

export type FiltersType = {
    budgetMin: number,
    budgetMax: number,
};

export type FiltersPropsType = {
    values: FiltersType;
    setValues: (newValues: (prev: any) => any) => void;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}
