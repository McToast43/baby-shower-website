import "./App.css";
import Hero from "./components/Hero/Hero";
import ItemList from "./components/ItemList/ItemList";
import Navbar from "./components/Navbar/Navbar";
import NameContextProvider from "./contexts/name-context";
import ItemsContextProvider from "./contexts/items-context";

function App() {
  return (
    <>
      <NameContextProvider>
        <ItemsContextProvider>
          <Navbar />
          <Hero />
          <ItemList />
        </ItemsContextProvider>
      </NameContextProvider>
    </>
  );
}

export default App;
