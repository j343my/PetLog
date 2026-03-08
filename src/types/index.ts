export type Temporality = 'Matin' | 'Midi' | 'Soir' | 'Fait' | string;

export interface Medication {
  id: string;
  name: string;
  colorClass: string;
  temporalities: Temporality[];
  isEarMedication?: boolean;
  earSide?: 'Gauche' | 'Droite' | 'Alterné' | 'Les deux';
}

export interface TrackerConfig {
  petName: string;
  targetMonth: string; // YYYY-MM
  medications: Medication[];
}
