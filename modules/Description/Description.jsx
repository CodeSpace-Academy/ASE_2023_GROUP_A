import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  }, // You might want to use ObjectId or another suitable type as the _id field
  description: String,
});

const descriptionModel = mongoose.model("recipes_edit", recipeSchema);

module.exports = descriptionModel;
