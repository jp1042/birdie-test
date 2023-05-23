import { createContext, useState } from "react";
import { CareData } from "./types";

type ContextValue = {
  careData: CareData;
  setCareData: React.Dispatch<React.SetStateAction<CareData>>;
};

const initialState = {
  careRecipeintData: [],
  eventDates: [],
  careRecipientName: "",
  loading: false,
  error: "",
};

const CareDataContext = createContext<ContextValue>({
  careData: initialState,
  setCareData: () => {},
});

const CareDataContextProvider = ({ children }) => {
  const [careData, setCareData] = useState<CareData>(initialState);

  return (
    <CareDataContext.Provider value={{ careData, setCareData }}>
      {children}
    </CareDataContext.Provider>
  );
};

export { CareDataContext, CareDataContextProvider };
