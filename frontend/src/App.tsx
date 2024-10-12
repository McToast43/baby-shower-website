import "./App.css";
import Hero from "./components/Hero/Hero";
import ItemList from "./components/ItemList/ItemList";
import Navbar from "./components/Navbar/Navbar";
//import Placeholder from "./components/Placeholder";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <ItemList />
    </>
  );
}

export default App;
