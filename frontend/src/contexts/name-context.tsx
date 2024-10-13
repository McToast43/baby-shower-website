import React, { createContext, useContext, useState, useEffect } from "react";
type NameContextProviderProps = {
  children: React.ReactNode;
};

type NameContext = {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  //setName: (name: string) => void;
};

export const NameContext = createContext<NameContext | null>(null);

export default function NameContextProvider({
  children,
}: NameContextProviderProps) {
  const [name, setName] = useState<string>("");

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    if (storedName) {
      setName(storedName);
    }
  }, []);

  return (
    <NameContext.Provider value={{ name, setName }}>
      {children}
    </NameContext.Provider>
  );
}

export function useNameContext() {
  const context = useContext(NameContext);
  if (!context) {
    throw new Error("useNameContext must be used within a NameContextProvider");
  }
  return context;
}
