import mongoose from "mongoose";
import Category from "./Category";

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    validate: [
      {
        validator: async (value: string) => {
          return !isNaN(+value);
        },
        message: "Price must be number",
      },
    ]
  },
  image: {
    type: String,
    required: [true, "Image is required"],
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
    validate: {
      validator: async (value: string) => {
        const category = await Category.findById(value);
        return !!category;
      },
      message: "Category not found",
    },
  },
  seller: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }
});


const Item = mongoose.model("Item", ItemSchema);
export default Item;