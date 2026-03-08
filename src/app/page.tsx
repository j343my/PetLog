'use client';

import { useState } from 'react';
import { TrackerConfig } from '@/types';
import PetForm from '@/components/PetForm';
import TrackerDocument from '@/components/TrackerDocument';

const DEFAULT_CONFIG: TrackerConfig = {
  petName: 'Swiffy',
  targetMonth: '2026-03',
  medications: [
    { id: '1', name: 'Emeprid (2.5 ml)', colorClass: 'emeprid', temporalities: ['Matin', 'Midi', 'Soir'] },
    { id: '2', name: 'Felimazole', colorClass: 'felimazole', temporalities: ['Matin', 'Soir'] },
    { id: '3', name: 'B12 (1 fois par semaine)', colorClass: 'b12', temporalities: ['Fait'] },
    { id: '4', name: 'Mirataz (tous les soirs)', colorClass: 'mirataz', temporalities: ['Soir'] },
    { id: '5', name: 'Cerenia', colorClass: 'cerenia', temporalities: ['Fait'] },
  ],
};

export default function Home() {
  const [config, setConfig] = useState<TrackerConfig>(DEFAULT_CONFIG);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen">
      <PetForm config={config} onChange={setConfig} onPrint={handlePrint} />
      <TrackerDocument config={config} />
    </div>
  );
}
