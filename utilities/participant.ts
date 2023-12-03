export interface IParticipant {
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

export const emptyParticipant = {
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

export const createNewParticipant = (id: string) => {
  return {
    id: id,
    name: { value: "", error: false },
    email: { value: "", error: false },
  };
};
