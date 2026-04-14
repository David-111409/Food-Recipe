import { useEffect, useState } from "react";
import axios from "axios";
import { HiHeart } from "react-icons/hi2";
function AllRecipes() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const res = await axios.get("http://localhost:3000/recipes");
      setRecipes(res.data.recipes);
    };

    fetchRecipes();
  }, []);

  return (
    <div className="recipes-container">
      <h2>All Recipes</h2>

      <div className="cards-wrapper">
        {recipes?.map((recipe) => {
          return (
            <div className="recipe-card" key={recipe?._id}>
              <h4 className="mt-4">{recipe?.title}</h4>
              <p>{recipe?.ingredients}</p>
              <HiHeart className="icons" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AllRecipes;
