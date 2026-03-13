import type { NOTE_TYPES, SORT_OPTIONS } from "@/lib/constants";

export type NoteType = (typeof NOTE_TYPES)[number];
export type SortOption = (typeof SORT_OPTIONS)[number];

export type Tag = {
  id: string;
  name: string;
  slug: string;
  noteCount?: number;
  lastUsedAt?: string | null;
};

export type NoteRecord = {
  id: string;
  title: string;
  content: string;
  type: NoteType;
  source: string | null;
  url: string | null;
  author: string | null;
  favorite: boolean;
  bookTitle: string | null;
  bookAuthor: string | null;
  highlight: string | null;
  personalInsight: string | null;
  aiSummary: string | null;
  aiSummaryStatus: string | null;
  semanticStatus: string | null;
  reviewAt: string | null;
  createdAt: string;
  updatedAt: string;
  tags: Tag[];
};

export type DashboardStats = {
  totalNotes: number;
  totalBooks: number;
  totalLinks: number;
  totalTags: number;
};

export type NotesFilters = {
  query?: string;
  type?: string;
  tag?: string;
  favorite?: string;
  sort?: string;
};

export type FormState = {
  error?: string;
};

export type NoteFormValues = {
  title?: string;
  content?: string;
  type?: NoteType;
  source?: string;
  url?: string;
  author?: string;
  tags?: string;
  favorite?: boolean;
  bookTitle?: string;
  bookAuthor?: string;
  highlight?: string;
  personalInsight?: string;
};
