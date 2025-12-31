export interface Card {
  id: string;
  title: string;
  description: string;
  columnId: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Column {
  id: string;
  title: string;
  order: number;
  cards: Card[];
}

export interface BoardData {
  columns: Column[];
  lastModified: Date;
}
