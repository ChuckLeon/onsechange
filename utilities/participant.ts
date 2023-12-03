export interface IParticipant {
  id: string;
  name: string;
  email: string;
}
export const emptyParticipant = {
  id: crypto.randomUUID(),
  name: "",
  email: "",
};

export const createNewParticipant = (id: string) => {
  return {
    id: id,
    name: "",
    email: ""
  }
}
