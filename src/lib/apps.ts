export type AppId =
  | "profile"
  | "works"
  | "experience"
  | "stack"
  | "contact"
  | "terminal"
  | "game";

export interface AppProps {
  onOpen: (id: AppId, arg?: string) => void;
  arg?: string;
}
