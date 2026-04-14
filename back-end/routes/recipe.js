import express from "express";
import { Recipe } from "../models/Recipe.js";

const router = express.Router();

// Get recipes all
router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json({ count: recipes.length, recipes });
  } catch (error) {
    res.status(500).json({ message: "Get Failed " +  error.message });
  }
});

// Create recipe
router.post("/", async (req, res) => {
  try {
    const { title, ingredients, instructions } = req.body;
    if (!title || !ingredients || !instructions) {
      return res.status(400).send({ message: "All fields are required!" });
    }

    const newRecipe = await Recipe.create(req.body);

    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(500).json({ message: "Create failed: " + error.message });
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
