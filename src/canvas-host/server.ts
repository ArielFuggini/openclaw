// Minimal stub - canvas host removed
export type CanvasHostServer = {
  port: number;
  close: () => Promise<void>;
};

export type CanvasHostHandler = {
  rootDir: string | null;
  handleRequest: (req: unknown, res: unknown) => void;
  handleHttpRequest: (req: unknown, res: unknown) => Promise<boolean>;
  handleUpgrade: (req: unknown, socket: unknown, head: unknown) => boolean;
  close: () => Promise<void>;
};

export function createCanvasHostHandler(_opts?: unknown): CanvasHostHandler {
  return {
    rootDir: null,
    handleRequest: () => {},
    handleHttpRequest: async () => false,
    handleUpgrade: () => false,
    close: async () => {},
  };
}

export async function startCanvasHostServer(): Promise<null> {
  return null;
}
