// Minimal stub - polls removed
export type PollInput = {
  question: string;
  options: string[];
  maxSelections?: number;
  durationHours?: number;
};

export type PollResult = {
  pollId: string;
};

export function normalizePollInput(input: PollInput, _opts?: { maxOptions?: number }): PollInput {
  return input;
}
