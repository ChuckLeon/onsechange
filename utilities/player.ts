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

export const emptyPlayer = {
  id: crypto.randomUUID(),
  name: {
    value: "",
    error: false,
  },
  email: {
    value: "",
    error: false,
  },
};

export const createNewPlayer = (id: string) => {
  return {
    id: id,
    name: { value: "", error: false },
    email: { value: "", error: false },
  };
};
