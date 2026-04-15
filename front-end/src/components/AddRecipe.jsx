import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddRecipe() {
  const [recipe, setRecipe] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onHandleChange = (e) => {
    let val;
    if (e.target.name === "ingredients") {
      val = e.target.value.split(",");
    } else {
      val = e.target.value;
    }
    setRecipe((prev) => ({ ...prev, [e.target.name]: val }));
  };

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/recipes", recipe);
      navigate("/");
    } catch (error) {
      setError(error.response?.data?.message);
      console.log("Error Message:", error.response?.data?.message);
      console.log("Status Code:", error.response?.status);
    }
  };

  return (
    <form className="input-form w-50 m-auto" onSubmit={onHandleSubmit}>
      <input
        name="title"
        className="form-control mt-3"
        type="text"
        placeholder="title"
        onChange={onHandleChange}
      />
      <textarea
        rows={"5"}
        name="ingredients"
        className="form-control mt-3"
        type="text"
        placeholder="ingredients"
        onChange={onHandleChange}
      />
      <textarea
        rows={"5"}
        name="instructions"
        className="form-control mt-3"
        type="text"
        placeholder="instructions"
        onChange={onHandleChange}
      />
      <label className="mt-4">Add Image</label>
      <input
        name="coverImage"
        className="form-control mt-3"
        type="file"
        onChange={onHandleChange}
      />
      <div className="text-center">
        {error && (
          <h5 className="mt-2" style={{ color: "red" }}>
            {error}
          </h5>
        )}
        <button className="button mt-5" type="submit">
          save your recipe
        </button>
      </div>
    </form>
  );
}

export default AddRecipe;
