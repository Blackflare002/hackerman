"use strict";
const { json } = require("express");
const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "../.env" });
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
    // console.log("connected!");
    const companies = await db.collection("companies").find().toArray();
    // above we are searching in the collection and are finding all of the items inside the array.

    if (companies.length > 0) {
      res.status(200).json({ status: 200, companies, message: "success" });
    } else {
      res.status(404).json({ status: 404, messsage: "not found" });
    }
  } catch (err) {
    res.status(500).json({ status: 500, message: err.stack });
  }
  client.close();
  //   console.log("disconnected");
};
// this gets retrieves the individual compagnies by id
const getACompaniesId = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("ecommerce_db");
    // console.log("connected!");
    const _id = req.params._id;
    const singleCompanies = await db
      // singleCompanies is the variable retriefves the id of the compagnies
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
};
// this enpoint retrives the entire array of items.
//same principle as the get compagnies, but this retrieves items.
const getItems = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("ecommerce_db");

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
};

// get multiple items by ID
const getManyItems = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const { itemIds } = req.body;

  // build array of objects { _id: <id> } for $or query
  const itemIdsQuery = itemIds.map((_id) => ({ _id: Number(_id) }));

  const query = {
    $or: itemIdsQuery,
  };
  // console.log(itemIdsQuery);
  try {
    await client.connect();
    const db = client.db("ecommerce_db");

    const updatedItems = await db.collection("items").find(query).toArray();
    if (updatedItems) {
      res.status(200).json({ status: 200, data: updatedItems });
    } else {
      res.status(404).json({ status: 404, message: "Item(s) not found." });
    }
  } catch (err) {
    res.status(500).json({ status: 500, message: err.stack });
  }
};

// this retrieves a single item based off its _Id
//same principle as what was done with compagnies/:id but this one is for items.
const getSingleItem = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("ecommerce_db");

    const _id = req.params._id;

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
};
//this handler updates the stock. It first checks to see if the item does in fact have a value greater than 0
//then it allows the code to go threw. It searches for the items_id and then subsequentely reduces the stock.
// here are the steps: the function looks takes an an object of the cart
// // this is what the object is supposed to look like VVVVVV
// {
// 	"cart":[
// 		{"_id": 6543, "numPurchased": 2},

// 		{"_id":6545 , "numPurchased": 1}

// 	]
// }
const updateItemStock = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();

    const db = client.db("ecommerce_db");
    const _id = req.body._id;
    let cart = req.body.cart;
    let idsArray = cart.map((item) => {
      return Number(item._id);
    });
    //this part below, the numInstock: 1 _id does not work. So instead we used a find to find the stocks that match the cart.

    const itemsStock = await db
      .collection("items")
      .find({ _id: { $in: idsArray } }, { numInStock: 1, _id: 0 })
      .toArray();
    console.log(itemsStock);
    let stockCheck = itemsStock.find((item) => {
      return item.numInStock <= 0;
    });

    //check to see if the stock is empty.
    if (stockCheck) {
      return res
        .status(400)
        .json({ status: 400, messsage: "this item is out stock" });
    } else {
      for (let i = 0; i < cart.length; i++) {
        {
          cart[i]._id;
        }
        // using a query that matches the _id of the objects in the carts wiith
        const query = { _id: cart[i]._id };
        const updatedValues = {
          $inc: { numInStock: -Number(cart[i].numPurchased) },
        };
        //updating the cart inside opf teh data base.
        const updatedCart = await db
          .collection("items")
          .updateOne(query, updatedValues);
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
  getManyItems,
  getSingleItem,
  updateItemStock,
};
