export interface Page {
  label: string;
  url: string;
  visibility?: boolean;
}

export type Pages = Page[];

export interface Session {
  loggedIn: boolean;
}

export interface LS {
  nightMode: boolean;
}

export interface FomrProps {
  type: 'login' | 'register';
}

export interface FormValues {
  email: string;
  password: string;
}

export interface TabPanelProps {
  index: number;
  value: number;
}

export interface PaletteSection {
  [key: string]: string;
}

export interface Palette {
  [key: string]: PaletteColor;
}
