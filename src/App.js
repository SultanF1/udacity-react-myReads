import "./App.css";
import Bookshelf from "./Bookshelf";
import Query from "./Query";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Bookshelf></Bookshelf>} />
      <Route exact path="/search" element={<Query></Query>} />
    </Routes>
  );
}

export default App;
