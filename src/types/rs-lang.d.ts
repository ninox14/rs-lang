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

export interface PaletteSection {
  [key: string]: string;
}

export interface Palette {
  [key: string]: PaletteColor;
}

export interface Author {
  name?: string;
  nickname?: string;
  github?: string;
  picture?: string;
  role?: string;
}

export type Authors = Author[];
