import { validate as validateUUid } from "uuid";

const validateSearch = (input: string | undefined) => {
  if (!input) return "Empty ID: Please enter an ID";
  if (!validateUUid(input)) return "Invalid ID: Please enter a valid ID";
};

export { validateSearch };
