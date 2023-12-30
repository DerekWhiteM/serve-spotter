import { AuthModel } from "pocketbase";
import { createContext } from "react";

type AppContextState = {
    user: AuthModel;
    setUser: React.Dispatch<React.SetStateAction<AuthModel>> | null;
  };

const initialState = {
    user: null,
    setUser: () => {}
};

export const AppContext = createContext<AppContextState>(initialState);
