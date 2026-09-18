/** Calendar date in YYYY-MM-DD format, without a time or timezone. No runtime validation. */
export type DateOnly = string;

/** ISO 8601 timestamp in UTC, e.g. 2026-09-18T12:00:00.000Z. */
export type Timestamp = string;

export type DocumentSourceType = 'camera' | 'gallery' | 'file' | 'manual';

export type Document = {
  id: string;
  title: string;
  /** Flexible category value or identifier, not a fixed document-type enum. */
  category?: string;
  /** Secondary information: date of purchase, invoice issuance or contract signing. */
  eventDate?: DateOnly;
  sourceType: DocumentSourceType;
  localFileUri?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

/** Overdue and urgent are derived from dueDate and the current date, not stored. */
export type DeadlineStatus = 'active' | 'completed' | 'cancelled';

export type RecurrenceFrequency = 'daily' | 'weekly' | 'monthly' | 'yearly';

export type RecurrenceRule = {
  frequency: RecurrenceFrequency;
  /** Positive integer: e.g. 3 with monthly means every 3 months. No runtime validation. */
  interval: number;
};

export type Deadline = {
  id: string;
  /** Optional Document.id reference; a document can have zero or more deadlines. */
  documentId?: string;
  actionTitle: string;
  /** Base date or date of the current occurrence; no next-occurrence generation. */
  dueDate: DateOnly;
  note?: string;
  recurrence?: RecurrenceRule;
  status: DeadlineStatus;
  completedAt?: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};
