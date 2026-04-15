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
    } else if (e.target.name === "coverImage") {
      val = e.target.files[0];
    } else {
      val = e.target.value;
    }
    setRecipe((prev) => ({ ...prev, [e.target.name]: val }));
  };

  const handleSubmit = async (e) => {
    console.log(recipe);
    e.preventDefault();
    const { title, ingredients, instructions, coverImage } = recipe;
    if (!title || !ingredients || !instructions || !coverImage) {
      setError("Give all fields");
      return;
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("ingredients", ingredients);
    formData.append("instructions", instructions);

    // تأكد أن الاسم 'coverImage' يطابق الاسم الموجود في Multer بالباك إيند
    if (recipe.coverImage) {
      formData.append("coverImage", coverImage);
    }

    try {
      await axios.post("http://localhost:3000/recipes", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // ضروري جداً لرفع الملفات
          // إذا كنت تستخدم توكن، أضفه هنا أيضاً:
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Recipe added successfully!");
      navigate("/");
    } catch (error) {
      setError(error.message);
      console.error("Error details:", error.response?.data?.message || error.message);
    }
  };

  return (
    <form className="input-form w-50 m-auto" onSubmit={handleSubmit}>
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
