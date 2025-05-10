export interface Book {
  _id: string;
  name: string;
  authors: string[];
  genres: string[];
  availability: boolean;
  timesBorrowed: number;
  loanDuration: number;
  lastLoanDate: string | null;
}
