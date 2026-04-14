// App.tsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Nav";
// import RecipeDetails from "./pages/RecipeDetails";
// import CreateRecipe from "./pages/CreateRecipe";
// import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/recipe/:id" element={<RecipeDetails />} />
        <Route path="/create" element={<CreateRecipe />} /> */}
      </Routes>
    </>
  );
}

export default App;
