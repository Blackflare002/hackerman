"use strict";
const { json } = require("express");
const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "./.env" });
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
// this endpoint is to fetch the compagnies api
const getCompanies = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("ecommerce_db");
    console.log("connected!");
    const companies = await db.collection("companies").find().toArray();

    if (companies.length > 0) {
      res.status(200).json({ status: 200, companies, message: "success" });
    } else {
      res.status(404).json({ status: 404, messsage: "not found" });
    }
  } catch (err) {
    res.status(500).json({ status: 500, message: err.stack });
  }
  client.close();
  console.log("disconnected");
};
// this gets retrieves the individual compagnies by id
const getACompaniesId = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("ecommerce_db");
    console.log("connected!");
    const _id = req.params._id;
    const singleCompanies = await db
      .collection("companies")
      .findOne({ _id: Number(_id) });
    if (singleCompanies) {
      res
        .status(200)
        .json({ status: 200, singleCompanies, message: "success" });
    } else {
      res.status(404).json({ status: 404, messsage: "not found" });
    }
  } catch (err) {
    res.status(500).json({ status: 500, message: err.stack });
  }
  client.close();
  console.log("disconnected");
};
// this enpoint retrives the entire array of items.
const getItems = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("ecommerce_db");
    console.log("connected!");
    const items = await db.collection("items").find().toArray();
    if (items.length > 0) {
      res.status(200).json({ status: 200, items, message: "success" });
    } else {
      res.status(404).json({ status: 404, messsage: "not found" });
    }
  } catch (err) {
    res.status(500).json({ status: 500, message: err.stack });
  }
  client.close();
  console.log("disconnected");
};
// this retrieves a single item based off its _Id
const getSingleItem = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("ecommerce_db");
    console.log("connected!");
    const _id = req.params._id;
    console.log({ _id });
    const singleItem = await db
      .collection("items")
      .findOne({ _id: Number(_id) });
    if (singleItem) {
      res.status(200).json({ status: 200, singleItem, message: "success" });
    } else {
      res.status(404).json({ status: 404, messsage: "not found" });
    }
  } catch (err) {
    res.status(500).json({ status: 500, message: err.stack });
  }
  client.close();
  console.log("disconnected");
};
const updateItemStock = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    console.log("connected!");
    const db = client.db("ecommerce_db");
    const _id = req.body._id;
    let cart = req.body.cart;
    let idsArray = cart.map((item) => {
      return Number(item._id);
    });
    console.log(idsArray);
    const itemsStock = await db
      .collection("items")
      .find({ _id: { $in: idsArray } }, { numInStock: 1, _id: 0 })
      .toArray();
    console.log(itemsStock);
    let stockCheck = itemsStock.find((item) => {
      return item.numInStock <= 0;
    });
    console.log(stockCheck);
    if (stockCheck) {
      return res
        .status(400)
        .json({ status: 400, messsage: "this item is out stock" });
    } else {
      for (let i = 0; i < cart.length; i++) {
        {
          cart[i]._id;
        }
        const query = { _id: cart[i]._id };
        const updatedValues = {
          $inc: { numInStock: -Number(cart[i].numPurchased) },
        };
        const updatedCart = await db
          .collection("items")
          .updateOne(query, updatedValues);
        console.log(updatedCart);
      }
      res.status(200).json({ status: 200, cart, message: "success" });
    }
  } catch (err) {
    res.status(500).json({ status: 500, message: err.stack });
  }
};
// // this is what the object is supposed to look like VVVVVV
// {
// 	"cart":[
// 		{"_id": 6543, "numPurchased": 2},

// 		{"_id":6545 , "numPurchased": 1}

// 	]
// }

module.exports = {
  getCompanies,
  getACompaniesId,
  getItems,
  getSingleItem,
  updateItemStock,
};
