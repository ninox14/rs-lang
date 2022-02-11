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
