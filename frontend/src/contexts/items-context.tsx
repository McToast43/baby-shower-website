import React, { createContext, useContext, useState, useEffect } from "react";
import { Item } from "../types";

type ItemsContextProviderProps = {
  children: React.ReactNode;
};

type ItemsContext = {
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
};

export const ItemsContext = createContext<ItemsContext | null>(null);

export default function ItemsContextProvider({
  children,
}: ItemsContextProviderProps) {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch(
        "https://dcjxtfwogo54re36b263h2fyhm0cvfku.lambda-url.eu-west-1.on.aws/items",
        {
          method: "GET",
        }
      );
      const data = await response.json();
      setItems(data);
    };

    fetchItems();
  }, []);

  return (
    <ItemsContext.Provider value={{ items, setItems }}>
      {children}
    </ItemsContext.Provider>
  );
}

export function useItemsContext() {
  const context = useContext(ItemsContext);
  if (!context) {
    throw new Error(
      "useItemsContext must be used within a ItemsContextProvider"
    );
  }
  return context;
}
