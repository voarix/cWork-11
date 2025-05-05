import express from "express";
import { imagesUpload } from "../middleware/multer";
import { Error } from "mongoose";
import Item from "../models/Item";
import { ItemWithoutId } from "../types";
import auth, { RequestWithUser } from "../middleware/auth";

const itemsRouter = express.Router();

itemsRouter.get("/", async (req, res, next) => {
  try {
    const category_id = req.query.category as string;
    const filter: { category?: string } = {};

    if (category_id) filter.category = category_id;
    const items = await Item.find(filter).populate("category", "title");
    res.send(items);
  } catch (e) {
    next(e);
  }
});

itemsRouter.get("/:id", async (req, res, next) => {
  const id = req.params.id;

  try {
    const item = await Item.findById(id);
    if (!item) {
      res.status(404).send({message: "Item not found"});
      return;
    }

    res.send(item);
  } catch (e) {
    if (e instanceof Error.CastError) {
      res.status(400).send({error: "Invali id"});
      return
    }

    next(e);
  }
});

itemsRouter.post("/", auth, imagesUpload.single("image"), async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;

    if (!req.file) {
      res.status(400).send({error: "Image is required"});
      return
    }

    const newItem: ItemWithoutId = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      image: "images/" + req.file.filename,
      category: req.body.category,
      seller: String(user._id),
    };

    const item = new Item(newItem);
    await item.save();
    res.send(item);
  } catch (error) {
    if (error instanceof Error.ValidationError || error instanceof Error.CastError) {
      res.status(400).send(error);
      return;
    }
    next(error);
  }
});


export default itemsRouter;