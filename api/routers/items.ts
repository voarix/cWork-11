import express from "express";
import { imagesUpload } from "../middleware/multer";
import { Error } from "mongoose";
import Item from "../models/Item";
import { ItemWithoutId } from "../types";
import auth, { RequestWithUser } from "../middleware/auth";
import User from "../models/User";

const itemsRouter = express.Router();

itemsRouter.get("/", async (req, res, next) => {
  try {
    const category_id = req.query.category as string;
    const filter: { category?: string } = {};

    if (category_id) filter.category = category_id;
    const items = await Item.find(filter).populate("category", "title").populate("seller", "username").select("-description");
    res.send(items);
  } catch (e) {
    if (e instanceof Error.CastError) {
      res.status(400).send({ error: "Invalid category_id" });
      return;
    }

    next(e);
  }
});

itemsRouter.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const token = req.get("Authorization");
    let userId: string | undefined;

    if (token) {
      const user = await User.findOne({token});
      if (user) userId = String(user._id);
    }

    const item = await Item.findById(id);
    if (!item) {
      res.status(404).send({message: "Item not found"});
      return;
    }

    const newItem = {
      ...item.toObject(),
      isSeller: userId ? userId === String(item.seller._id) : false,
    };

    res.send(newItem);
  } catch (error) {
    if (error instanceof Error.CastError) {
      res.status(400).send({error: "Invalid id"});
      return
    }

    next(error);
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
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      image: "images/" + req.file.filename,
      category: req.body.category,
      seller: String(user._id),
    };

    const item = new Item(newItem);
    await item.populate("seller", "username displayName phoneNumber");
    await item.populate("category", "title");
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

itemsRouter.delete("/:id", auth, async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = (req as RequestWithUser).user;

    const item = await Item.findOneAndDelete({_id: id, seller: user._id});
    if (!item) {
      res.status(403).send({error: "Item not found"});
      return;
    }

    res.send({message: "Image deleted successfully"});
  } catch (error) {
    if (error instanceof Error.CastError) {
      res.status(400).send({error: "Invalid id"});
      return
    }

    next(error);
  }
});

export default itemsRouter;