import "./App.css";
import Hero from "./components/Hero/Hero";
import ItemList from "./components/ItemList/ItemList";
import Navbar from "./components/Navbar/Navbar";
import NameContextProvider from "./contexts/name-context";

function App() {
  return (
    <>
      <NameContextProvider>
        <Navbar />
        <Hero />
        <ItemList />
      </NameContextProvider>
    </>
  );
}

export default App;
