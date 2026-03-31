import { ActivityType } from './types';

export interface ActivityCategory {
  key: ActivityType;
  label: string;
  icon: string;
}

export const ACTIVITY_CATEGORIES: ActivityCategory[] = [
  { key: 'boat_yacht_tours', label: 'Boat Tours', icon: 'Ship' },
  { key: 'snorkeling_diving_tours', label: 'Snorkeling & Diving', icon: 'Waves' },
  { key: 'fishing_charter', label: 'Fishing', icon: 'Fish' },
  { key: 'island_hopping', label: 'Island Hopping', icon: 'Palmtree' },
  { key: 'whale_dolphin_watching', label: 'Dolphin Watching', icon: 'Eye' },
  { key: 'sunset_dinner_cruises', label: 'Sunset Cruises', icon: 'Sunset' },
  { key: 'sandbar_tours', label: 'Sandbar Tours', icon: 'Umbrella' },
  { key: 'shark_diving', label: 'Shark Diving', icon: 'Shell' },
  { key: 'stingray_tours', label: 'Stingray Tours', icon: 'Compass' },
  { key: 'sailing_catamaran_gulet_tours', label: 'Sailing', icon: 'Sailboat' },
  { key: 'eco_tours', label: 'Eco Tours', icon: 'Leaf' },
  { key: 'booze_cruises', label: 'Party Cruises', icon: 'Wine' },
  { key: 'canoe_kayak_tours', label: 'Kayaking', icon: 'Anchor' },
  { key: 'paddleboard_activity', label: 'Paddleboard', icon: 'Footprints' },
];

export const BOAT_CATEGORIES = [
  'Center console boats',
  'Sportfishing boats',
  'Yachts',
  'Catamarans',
  'Other',
] as const;

export function getActivityLabel(key: ActivityType): string {
  return ACTIVITY_CATEGORIES.find((c) => c.key === key)?.label ?? key;
}

export function getActivityIcon(key: ActivityType): string {
  return ACTIVITY_CATEGORIES.find((c) => c.key === key)?.icon ?? 'Circle';
}
