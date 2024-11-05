import { createContext, useContext } from "react";
import { books as booksData } from "../data/books";
import { useLocalStorage } from "@uidotdev/usehooks";

const DataContext = createContext();
export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("proivder for data context not found");
  }
  return context;
};

const DataProvider = ({ children }) => {
  const [books, setBooks] = useLocalStorage("books", booksData);
  const value = {
    books,
    setBooks,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export default DataProvider;
