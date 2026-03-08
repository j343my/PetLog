'use client';

import { useState } from 'react';
import { TrackerConfig, Medication, Temporality } from '@/types';
import { Plus, Trash2, Printer } from 'lucide-react';

const AVAILABLE_COLORS = ['emeprid', 'felimazole', 'b12', 'mirataz', 'cerenia'];
const AVAILABLE_TEMPORALITIES: Temporality[] = ['Matin', 'Midi', 'Soir', 'Fait'];

interface PetFormProps {
    config: TrackerConfig;
    onChange: (config: TrackerConfig) => void;
    onPrint: () => void;
}

export default function PetForm({ config, onChange, onPrint }: PetFormProps) {
    const updateConfig = (updates: Partial<TrackerConfig>) => {
        onChange({ ...config, ...updates });
    };

    const addMedication = () => {
        const nextColorCode = AVAILABLE_COLORS[config.medications.length % AVAILABLE_COLORS.length];
        const newMed: Medication = {
            id: Math.random().toString(36).substr(2, 9),
            name: '',
            colorClass: nextColorCode,
            temporalities: ['Matin'],
        };
        updateConfig({ medications: [...config.medications, newMed] });
    };

    const removeMedication = (id: string) => {
        updateConfig({
            medications: config.medications.filter((m) => m.id !== id),
        });
    };

    const updateMedication = (id: string, updates: Partial<Medication>) => {
        updateConfig({
            medications: config.medications.map((m) => (m.id === id ? { ...m, ...updates } : m)),
        });
    };

    const toggleTemporality = (med: Medication, temp: Temporality) => {
        const newTemps = med.temporalities.includes(temp)
            ? med.temporalities.filter((t) => t !== temp)
            : [...med.temporalities, temp];
        updateMedication(med.id, { temporalities: newTemps });
    };

    return (
        <div className="no-print bg-slate-800 text-white p-6 shadow-md mb-8 sticky top-0 z-50">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8 items-start">
                {/* Left Col: Basics */}
                <div className="flex-1 space-y-4">
                    <div>
                        <h1 className="text-2xl font-bold mb-1">PetLog</h1>
                        <p className="text-slate-300 text-sm">Suivi Quotidien de Santé</p>
                    </div>

                    <div className="space-y-3">
                        <div>
                            <label className="block text-sm font-medium mb-1">Nom de l'animal</label>
                            <input
                                type="text"
                                value={config.petName}
                                onChange={(e) => updateConfig({ petName: e.target.value })}
                                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Ex: Swiffy"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Mois du suivi</label>
                            <input
                                type="month"
                                value={config.targetMonth}
                                onChange={(e) => updateConfig({ targetMonth: e.target.value })}
                                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <div className="pt-4">
                        <button
                            onClick={onPrint}
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-md font-bold transition-colors w-full justify-center"
                        >
                            <Printer className="w-5 h-5" />
                            Imprimer / Sauvegarder PDF
                        </button>
                    </div>
                </div>

                {/* Right Col: Medications */}
                <div className="flex-[2] bg-slate-750 p-4 rounded-xl border border-slate-600 w-full">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">Médicaments</h2>
                        <button
                            onClick={addMedication}
                            className="flex items-center gap-1 text-sm bg-slate-600 hover:bg-slate-500 px-3 py-1.5 rounded"
                        >
                            <Plus className="w-4 h-4" /> Ajouter
                        </button>
                    </div>

                    <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                        {config.medications.length === 0 && (
                            <p className="text-sm text-slate-400 text-center py-4">Aucun médicament ajouté.</p>
                        )}
                        {config.medications.map((med) => (
                            <div key={med.id} className="bg-slate-700 p-3 rounded-lg flex gap-4 items-start border border-slate-600">
                                <div className="flex-1 space-y-3">
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={med.name}
                                            onChange={(e) => updateMedication(med.id, { name: e.target.value })}
                                            placeholder="Nom du médicament (ex: Emeprid 2.5 ml)"
                                            className="w-full px-3 py-1.5 bg-slate-800 border border-slate-600 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        />
                                        <label className="flex items-center gap-2 text-xs bg-slate-800 px-3 py-1.5 rounded-md border border-slate-600 cursor-pointer whitespace-nowrap">
                                            <input
                                                type="checkbox"
                                                checked={med.isEarMedication}
                                                onChange={(e) => updateMedication(med.id, { isEarMedication: e.target.checked, earSide: e.target.checked ? 'Gauche' : undefined })}
                                                className="rounded text-blue-500 bg-slate-800 border-slate-600 focus:ring-blue-500"
                                            />
                                            Auriculaire
                                        </label>
                                    </div>

                                    <div className="flex flex-wrap gap-x-6 gap-y-2">
                                        <div className="flex flex-wrap gap-2">
                                            <span className="text-[10px] uppercase text-slate-400 font-bold block w-full mb-1">Temporalité</span>
                                            {AVAILABLE_TEMPORALITIES.map((temp) => (
                                                <label key={temp} className="flex items-center gap-1.5 text-xs cursor-pointer select-none">
                                                    <input
                                                        type="checkbox"
                                                        checked={med.temporalities.includes(temp)}
                                                        onChange={() => toggleTemporality(med, temp)}
                                                        className="rounded text-blue-500 bg-slate-800 border-slate-600 focus:ring-blue-500"
                                                    />
                                                    {temp}
                                                </label>
                                            ))}
                                        </div>

                                        {med.isEarMedication && (
                                            <div className="flex flex-wrap gap-2">
                                                <span className="text-[10px] uppercase text-slate-400 font-bold block w-full mb-1">Côté d'application</span>
                                                {(['Gauche', 'Droite', 'Alterné', 'Les deux'] as const).map((side) => (
                                                    <label key={side} className="flex items-center gap-1.5 text-xs cursor-pointer select-none">
                                                        <input
                                                            type="radio"
                                                            name={`ear-side-${med.id}`}
                                                            checked={med.earSide === side}
                                                            onChange={() => updateMedication(med.id, { earSide: side })}
                                                            className="text-blue-500 bg-slate-800 border-slate-600 focus:ring-blue-500"
                                                        />
                                                        {side}
                                                    </label>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <button
                                    onClick={() => removeMedication(med.id)}
                                    className="text-slate-400 hover:text-red-400 p-1 transition-colors"
                                    title="Supprimer"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
