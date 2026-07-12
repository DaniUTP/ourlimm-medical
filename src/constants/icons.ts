import {
  Calendar,
  Save,
  Search,
  User,
  Home,
  Trash,
  Edit,
} from 'lucide-react';

export const MEDICAL_ICONS = {
  calendar: Calendar,
  save: Save,
  search: Search,
  user: User,
  home: Home,
  trash: Trash,
  edit: Edit,
} as const;


export type MedicalIconName = keyof typeof MEDICAL_ICONS;