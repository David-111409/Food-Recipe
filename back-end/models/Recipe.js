import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    ingredients: {
      type: [String],
      required: true,
    },
    instructions: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export const Recipe = mongoose.model("Recipe", recipeSchema);
