import { Schema, model } from "mongoose";
import { TCategory } from "./category.interface";

const categorySchema = new Schema<TCategory>({
  categoryName: { type: String, required: true },
});

const CategoryModel = model("categories", categorySchema);

export default CategoryModel;
