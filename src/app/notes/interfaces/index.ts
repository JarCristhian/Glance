export interface Props {
  show: boolean;
  onClose: () => void;
  setNote: () => void;
  // setNote: (update: boolean) => void;
}

export interface Tags {
  name: string;
  color: string;
}

export interface User {
  id: number;
  name: string;
}

export interface Get {
  id: number;
  title: string;
  description: string;
  loved: boolean;
  createdAtTime: string;
  tags: Tags[];
  author: string;
}

export interface Store {
  title: string;
  description: string;
  tags: Tags[];
}
