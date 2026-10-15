export interface IPlayer {
  id: string;
  name: {
    value: string;
    error: boolean;
  };
  email: {
    value: string;
    error: boolean;
  };
}

export type PlayerStatus = "empty" | "started" | "filled";

export const createNewPlayer = (id: string) => {
  return {
    id: id,
    name: { value: "", error: false },
    email: { value: "", error: false },
  };
};
