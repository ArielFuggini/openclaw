// Minimal stub - wizard prompter interface for CLI commands
export type WizardSelectOption<T = unknown> = { value: T; label: string; hint?: string };

export type WizardPrompter = {
  text(params: {
    message: string;
    placeholder?: string;
    defaultValue?: string;
    initialValue?: string;
    validate?: (value: string) => string | undefined;
  }): Promise<string>;
  confirm(params: {
    message: string;
    active?: string;
    inactive?: string;
    initialValue?: boolean;
  }): Promise<boolean>;
  select<T>(params: {
    message: string;
    options: Array<WizardSelectOption<T>>;
    initialValue?: T;
  }): Promise<T>;
  multiselect<T>(params: {
    message: string;
    options: Array<WizardSelectOption<T>>;
    required?: boolean;
    initialValues?: T[];
  }): Promise<T[]>;
  note(message: string, title?: string): void;
  intro(message?: string): void;
  outro(message?: string): void;
  spinner(): { start(msg?: string): void; stop(msg?: string): void; message(msg: string): void };
  progress(msg: string): { stop(msg?: string): void; update(msg: string): void };
  log: {
    info(msg: string): void;
    warn(msg: string): void;
    error(msg: string): void;
    step(msg: string): void;
    success(msg: string): void;
  };
  isCancel(value: unknown): boolean;
  cancel(msg?: string): void;
};

export class WizardCancelledError extends Error {
  constructor(message = "Wizard cancelled") {
    super(message);
    this.name = "WizardCancelledError";
  }
}
