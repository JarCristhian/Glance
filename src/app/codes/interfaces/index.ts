export interface Props {
  show: boolean;
  languages: GetL[];
  onClose: () => void;
  update: () => void;
  data?: Get | null;
}

export interface User {
  id: number;
  name: string;
}

export interface Types {
  dark: string;
  light: string;
}

export interface Get {
  id: number;
  title: string;
  description: string;
  content: string;
  themes: Types;
  createdAtTime: string;
  language: string;
  languageId: number;
  short: string;
  extention: string;
}

export interface Store {
  id?: number;
  title: string;
  description: string;
  content: string;
  languageId: number | string;
  themes: Types | any;
}

export interface PropsL {
  show: boolean;
  languages: GetL[];
  onClose: () => void;
  update: () => void;
  data?: GetL | null;
}

export interface GetL {
  id: number;
  name: string;
  short: string;
  extention: string;
  image: string;
  type: number;
  reference: number | string | null;
}

export interface StoreL {
  id?: number;
  name: string;
  short: string;
  extention: string;
  image: string;
  type: number;
  reference: number | string | null;
}
