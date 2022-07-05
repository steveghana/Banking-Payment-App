import React, { createContext, useState, useContext} from "react";


interface UIContext {
  activeSidebar: boolean;
  setactiveSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  toggleSidebar: () => void;
  indexOfFirstPost:number;
  indexOflastPost: number;
  setCurrentPage:React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  postperPage: number;

}
const defaultState = {
  activeSidebar: false,
};
export const StateContext = createContext<UIContext | undefined>(undefined);
const initialState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
};

interface Comp {
  children: JSX.Element;
}

export const ContextProvider: React.FC<Comp> = ({ children }) => {
  const [activeSidebar, setactiveSidebar] = useState(false);
  const [currentPage,setCurrentPage] = useState(1);
  const [postperPage] = useState(10);
  const indexOflastPost: number = currentPage * postperPage;
  const indexOfFirstPost:number = indexOflastPost - postperPage;

  // const [menuToggle, setmenuToggle] = useState(initialState);
  const toggleSidebar = () => setactiveSidebar((prev) => !prev);

  return (
    <StateContext.Provider
      value={{ activeSidebar, setactiveSidebar, toggleSidebar,setCurrentPage,currentPage, postperPage, indexOfFirstPost, indexOflastPost}}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => {
  let context = useContext(StateContext);
  if (context === undefined) {
    throw Error("No contxt");
  }
  return context;
};
