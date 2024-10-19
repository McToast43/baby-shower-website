import React, { createContext, useContext, useState, useEffect } from "react";
type NameContextProviderProps = {
  children: React.ReactNode;
};

type Name = {
  name: string;
  nameSha256: string;
};

type NameContext = {
  name: Name;
  setName: React.Dispatch<React.SetStateAction<Name>>;
};

export const NameContext = createContext<NameContext | null>(null);

export default function NameContextProvider({
  children,
}: NameContextProviderProps) {
  const [name, setName] = useState<Name>({ name: "", nameSha256: "" });

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    try {
      const parsedName = storedName
        ? JSON.parse(storedName)
        : { name: "", nameSha256: "" };
      if (storedName) {
        setName(parsedName);
      }
    } catch (error) {
      console.error(error);
      setName({ name: "", nameSha256: "" });
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
