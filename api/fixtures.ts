import mongoose from "mongoose";
import config from "./config";
import User from "./models/User";
import Category from "./models/Category";
import Item from "./models/Item";
import { randomUUID } from "node:crypto";


const run = async () => {
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection('users');
    await db.dropCollection('categories');
    await db.dropCollection('items');
  } catch (error) {
    console.log('Collections were not present, skipping drop');
  }

  const [user1, user2, user3] = await User.create(
    {
      username: "Jane2000",
      password: "123",
      displayName: "Jane",
      phoneNumber: "464416",
      token: randomUUID(),
    },
    {
      username: "Alikhan2008",
      password: "123",
      displayName: "Alikhan",
      phoneNumber: "89179847",
      token: randomUUID(),
    },
    {
      username: "AttractorSchool",
      password: "123",
      displayName: "Attractor",
      phoneNumber: "77788899",
      token: randomUUID(),
    }
  );

  const [category1, category2, category3] = await Category.create(
    {
      title: "Electronics",
      description: "Electronic devices,gadgets",
    },
    {
      title: "Furniture",
      description: "Home and office furniture",
    },
    {
      title: "Clothes",
      description: "Clothes for all people",
    }
  );

  await Item.create(
    {
      name: "iphone 16",
      description: "The latest iPhone",
      price: 1000,
      image: "fixtures/iphone-16.jpg",
      category: category1._id,
      seller: user1._id,
    },
    {
      name: "Coffee table",
      description: "Wooden table for terrace",
      price: 200,
      image: "fixtures/table.jpg",
      category: category2._id,
      seller: user1._id,
    },
    {
      name: "Samsung TV",
      description: "55 inch Smart TV",
      price: 7000,
      image: "fixtures/samsung-tv.jpg",
      category: category1._id,
      seller: user2._id,
    },
    {
      name: "Jacket",
      description: "jean jacket",
      price: 30,
      image: "fixtures/jacket.jpg",
      category: category3._id,
      seller: user3._id,
    },
    {
      name: "MacBook Pro m4 pro",
      description: "Latest model, 14-inch display, 24GB RAM, 512GB SSD",
      price: 3200,
      image: "fixtures/macbook.jpg",
      category: category1._id,
      seller: user2._id,
    },
    {
      name: "Dining Table",
      description: "Wood big dining table",
      price: 1300,
      image: "fixtures/dining-table.jpg",
      category: category2._id,
      seller: user3._id,
    },
    {
      name: "Mario shoes",
      description: "Limited edition 42 size",
      price: 798,
      image: "fixtures/mario-shoes.jpg",
      category: category3._id,
      seller: user1._id,
    }
  );
  await db.close();
};

run().catch(console.error);