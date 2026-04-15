import express from "express";
import { Recipe } from "../models/Recipe.js";
import { upload } from "../middleware/mutler.js";
const router = express.Router();

// Get recipes all
router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json({ count: recipes.length, recipes });
  } catch (error) {
    res.status(500).json({ message: "Get Failed " + error.message });
  }
});

// Create recipe
router.post("/", upload.single("coverImage"), async (req, res) => {
  try {
    const { title, ingredients, instructions } = req.body;

    // مسار الصورة المحفوظة في السيرفر
    const imagePath = req.file ? req.file.path : "";

    const newRecipe = new Recipe({
      title,
      ingredients,
      instructions,
      coverImage: imagePath, // حفظ المسار في قاعدة البيانات
    });

    await newRecipe.save();
    res.status(201).json({ message: "Recipe created with image!", recipe: newRecipe });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get recipe by [ID]
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const recipe = await Recipe.findById(id);

    if (!recipe) {
      return res.status(404).json({ message: "recipe not found" });
    }

    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ message: "Get Failed " + error.message });
  }
});

// @route   PUT /recipes/:id
// @desc    Update an existing recipe
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const updatedRecipe = await Recipe.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.status(200).json({ message: "Recipe updated successfully", data: updatedRecipe });
  } catch (error) {
    res.status(500).json({ message: "Update failed: " + error.message });
  }
});

// @route   DELETE /recipes/:id
// @desc    Delete a recipe from the database
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedRecipe = await Recipe.findByIdAndDelete(id);

    if (!deletedRecipe) {
      return res.status(404).json({ message: "Recipe not found, nothing to delete" });
    }

    res.status(200).json({ message: "Recipe deleted successfully", data: deletedRecipe });
  } catch (error) {
    res.status(500).json({ message: "Error deleting recipe: " + error.message });
  }
});
export default router;
