'use client';

import {FormEvent, useMemo, useState} from 'react';
import {useRouter} from "next/navigation";

const initialState = {
    salary: 0,
    duration: 20,
    monthlyPayment: 0,
    contribution: 0,
}

export default function Home() {
    const [salary, setSalary] = useState(initialState.salary);
    const [duration, setDuration] = useState(initialState.duration);
    const [monthlyPayment, setMonthlyPayment] = useState(initialState.monthlyPayment);
    const [contribution, setContribution] = useState(initialState.contribution);
    const router = useRouter();

    const monthlyPaymentMax = useMemo(() => salary * 0.35, [salary]);
    const monthDuration = useMemo(() => duration * 12, [duration]);
    const baseLoan = useMemo(() => Math.floor((monthlyPayment * monthDuration) / 1000) * 1000, [monthlyPayment, monthDuration]);
    const contributionMin = useMemo(() => baseLoan * 0.1, [baseLoan]);
    const totalLoan = useMemo(() => baseLoan + contribution, [baseLoan, contribution]);

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        router.push('/discover');
    }

    return (
        <div className="flex flex-grow flex-col justify-center items-center">
            <div className="w-full flex justify-center items-center">
                <form onSubmit={handleSubmit} className="w-full max-w-lg flex flex-col gap-2">
                    <h2>Simulateur d&#39;Emprunt</h2>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="salary">Quel est votre salaire ? (€/mois)</label>
                        <input
                            type="number"
                            id="salary"
                            name="salary"
                            placeholder="2000 €"
                            value={salary || ''}
                            onChange={(e) => setSalary(Number(e.target.value))}
                            className="pl-2 bg-background border border-foreground w-full"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center">
                            <label htmlFor="duration">Durée de l&#39;emprunt ?</label>
                            <div>{duration} ans</div>
                        </div>
                        <input
                            type="range"
                            id="duration"
                            name="duration"
                            min="5"
                            max="25"
                            step="1"
                            value={duration}
                            onChange={(e) => setDuration(Number(e.target.value))}
                            className="w-full"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center">
                            <label htmlFor="monthlyPayment">Montant des mensualités ?</label>
                            <div>{monthlyPayment} €/mois</div>
                        </div>
                        <input
                            type="number"
                            id="monthlyPayment"
                            name="monthlyPayment"
                            placeholder={`Max : ${monthlyPaymentMax.toFixed(0)} €`}
                            value={monthlyPayment || ''}
                            onChange={(e) => setMonthlyPayment(Number(e.target.value))}
                            className="pl-2 bg-background border border-foreground w-full"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="contribution">Quel est votre apport ?</label>
                        <input
                            type="number"
                            id="contribution"
                            name="contribution"
                            placeholder={`Min : ${contributionMin.toFixed(0)} €`}
                            value={contribution || ''}
                            onChange={(e) => setContribution(Number(e.target.value))}
                            className="pl-2 bg-background border border-foreground w-full"
                        />
                    </div>
                    {!monthlyPayment && !totalLoan ? null :
                        <div className="mt-4">
                            {monthlyPayment > 0 && (
                                <div className="w-full flex justify-between items-center">
                                    <div>Mensualité :</div>
                                    <div>{Math.floor(monthlyPayment)} €/mois</div>
                                </div>
                            )}
                            {contribution > 0 && totalLoan > 0 && (
                                <div className="w-full flex justify-between items-center">
                                    <div>Emprunt total :</div>
                                    <div>{totalLoan} €</div>
                                </div>
                            )}
                        </div>
                    }
                    <div className="mt-4 flex justify-end">
                        <button
                            type="submit"
                            className="border px-2 bg-blue-500"
                        >
                            Découvrir
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
