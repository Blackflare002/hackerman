const { MongoClient } = require("mongodb");
const items = require("./data/items.json")
const companies = require("./data/companies.json")

require("dotenv").config({ path: "../.env"});


const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

const client = new MongoClient(MONGO_URI, options);
const db = client.db("ecommerce_db");

const insertCompanies = async () => {
  try {
    await client.connect();
    const insertedCompanies = await db.collection("companies").insertMany(companies);
    if (insertedCompanies.value) {
      console.log("companies inserted");
    } else {
      console.log(insertedCompanies);
      console.log("companies failed to insert");
    }

  } catch(err) {
    console.log(err);
  }

  client.close();
}

const insertItems = async () => {
    try {
    await client.connect();
    const insertedItems = await db.collection("items").insertMany(items);
    if (insertedItems.value) {
      console.log("items inserted");
    } else {
      console.log(insertedItems);
      console.log("items failed to insert");
    }

  } catch(err) {
    console.log(err);
  }

  client.close();
}

// insertCompanies();
// insertItems();

// const getOneItem = async () => {
//   await client.connect();

//   const foundItem = await db.collection("items").findOne();

//   console.log(foundItem);

//   client.close()
// }

// getOneItem();