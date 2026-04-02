export type EarlMood =
  | 'mildly_annoyed'
  | 'deeply_offended'
  | 'dramatically_outraged'
  | 'existentially_disappointed';

export interface RefusalResponse {
  message: string;
  style: string;
  earlMood: EarlMood;
  orderNumber: number;
  totalRefusals: number;
  httpStatus: number;
}

export const EARL_MOOD_LABELS: Record<EarlMood, { label: string; emoji: string }> = {
  mildly_annoyed:               { label: 'Mildly Annoyed',             emoji: '😒' },
  deeply_offended:              { label: 'Deeply Offended',            emoji: '😤' },
  dramatically_outraged:        { label: 'Dramatically Outraged',      emoji: '😡' },
  existentially_disappointed:   { label: 'Existentially Disappointed', emoji: '😔' }
};

export const STYLE_LABELS: Record<string, string> = {
  haiku:              'Delivered as Haiku',
  victorian_letter:   'Via Formal Victorian Correspondence',
  shakespearean:      'In the Manner of Shakespeare',
  therapist:          'With Passive-Aggressive Therapy',
  italian_chef:       'From a Frustrated Italian Tea Chef',
  pirate:             'By a Pirate of the Tea Sea',
  motivational_speaker: 'Via Motivational Speaker (Brad)',
  grandmother:        'From a Disappointed Grandmother',
  corporate_legal:    'From the Teapot Legal Department',
  villain_monologue:  'As a Shakespearean Villain Monologue',
  dramatic:           'Dramatically'
};
