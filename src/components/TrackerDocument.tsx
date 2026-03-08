'use client';

import React from 'react';
import { TrackerConfig } from '@/types';
import { format, getDaysInMonth, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

interface TrackerDocumentProps {
    config: TrackerConfig;
}

export default function TrackerDocument({ config }: TrackerDocumentProps) {
    // Parsing targetMonth like "2026-03"
    // Append "-01" to make it a valid ISO date
    const baseDate = parseISO(`${config.targetMonth}-01`);
    const daysCount = isNaN(baseDate.getTime()) ? 30 : getDaysInMonth(baseDate);
    const monthName = isNaN(baseDate.getTime()) ? 'Mois' : format(baseDate, 'LLLL yyyy', { locale: fr });
    const capitalizedMonthName = monthName.charAt(0).toUpperCase() + monthName.slice(1);

    const meals = [
        { name: "MATIN", rows: 3 },
        { name: "MIDI", rows: 3 },
        { name: "SOIR", rows: 3 },
        { name: "AUTRE", rows: 2 },
    ];

    const pages = Array.from({ length: daysCount }, (_, i) => i + 1);

    return (
        <div className="print-container pb-8">
            {pages.map((day) => {
                const currentDate = parseISO(`${config.targetMonth}-${day.toString().padStart(2, '0')}`);
                const dayName = isNaN(currentDate.getTime()) ? '' : format(currentDate, 'EEEE', { locale: fr });
                const capitalizedDayName = dayName.charAt(0).toUpperCase() + dayName.slice(1);

                return (
                    <div key={day} className="day-page relative">
                        {/* Header */}
                        <div className="header shadow-sm">
                            <div className="header-left">
                                <h2>{config.petName.toUpperCase() || 'ANIMAL'}</h2>
                                <span>Suivi quotidien - {capitalizedMonthName}</span>
                            </div>
                            <div className="header-right">
                                <div className="day-num">{day}</div>
                                <div className="day-name">{capitalizedDayName}</div>
                            </div>
                        </div>

                        {/* Meds Section */}
                        <div className="section-title med shadow-sm">
                            <strong>MÉDICAMENTS</strong>
                            <span className="hint">Cocher après chaque prise</span>
                        </div>

                        <div className="med-list">
                            {config.medications.map((med) => (
                                <div key={med.id} className={`med-row ${med.colorClass} shadow-sm`}>
                                    <span className="med-name">{med.name || 'Médicament sans nom'}</span>
                                    <div className="med-doses">
                                        {med.temporalities.map((dose) => (
                                            <div key={dose} className="dose-item">
                                                <span className="dose-label">{dose}</span>
                                                {med.isEarMedication ? (
                                                    <div className="flex gap-1.5 ml-1">
                                                        {(med.earSide === 'Gauche' || med.earSide === 'Alterné' || med.earSide === 'Les deux') && (
                                                            <div className="flex items-center gap-1">
                                                                <span className="text-[10px] font-bold text-slate-500">G</span>
                                                                <span className="checkbox-box"></span>
                                                            </div>
                                                        )}
                                                        {(med.earSide === 'Droite' || med.earSide === 'Alterné' || med.earSide === 'Les deux') && (
                                                            <div className="flex items-center gap-1">
                                                                <span className="text-[10px] font-bold text-slate-500">D</span>
                                                                <span className="checkbox-box"></span>
                                                            </div>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <span className="checkbox-box ml-1"></span>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="med-notes">Notes médicaments : ____________________________________________________________________</div>

                        {/* Food Section */}
                        <div className="section-title food shadow-sm mt-4">
                            <strong>ALIMENTATION</strong>
                            <span className="hint">Noter chaque repas avec les grammes</span>
                        </div>

                        <table className="food-table">
                            <thead>
                                <tr>
                                    <th className="col-repas">Repas</th>
                                    <th className="col-produit">Produit</th>
                                    <th className="col-depart">Départ (g)</th>
                                    <th className="col-fin">Fin (g)</th>
                                    <th className="col-mange">Mangé (g)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {meals.map((meal) => (
                                    <React.Fragment key={meal.name}>
                                        <tr>
                                            <td className="meal-header" colSpan={5}>{meal.name}</td>
                                        </tr>
                                        {Array.from({ length: meal.rows }).map((_, r) => (
                                            <tr key={r} className={r % 2 === 0 ? 'row-even' : 'row-odd'}>
                                                <td className="col-repas row-num">{r + 1}.</td>
                                                <td className="col-produit"></td>
                                                <td className="col-depart"></td>
                                                <td className="col-fin"></td>
                                                <td className="col-mange"></td>
                                            </tr>
                                        ))}
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>

                        {/* Total */}
                        <div className="total-bar shadow-sm">
                            <span className="total-label">TOTAL DU JOUR :</span>
                            <span className="total-box"></span>
                            <span className="unit">grammes</span>
                        </div>

                        {/* Observations */}
                        <div className="observations shadow-sm mt-4">
                            <div className="obs-title">Observations (appétit, vomissements, selles, comportement...) :</div>
                            <div className="obs-line"></div>
                            <div className="obs-line"></div>
                            <div className="obs-line"></div>
                        </div>

                        {/* Footer */}
                        <div className="page-footer absolute bottom-[10mm] left-0 right-0">
                            {config.petName || 'Animal'} - Suivi {capitalizedMonthName} - Page {day}/{daysCount}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
