"use strict";

const express = require("express");
const morgan = require("morgan");

const PORT = 4000;
const {
  getCompanies,
  getItems,
  getSingleItem,
  getACompaniesId,
  updateItemStock,
} = require("./handlers");

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  // REST endpoints?
  //this endpoint gets all of the compagnies
  .get("/companies", getCompanies)
  // this endpoing retrieves the cvompagnies by _id
  .get("/companies/:_id", getACompaniesId)
  //this endpoint retrieves all items
  .get("/items", getItems)
  //this endpoint retrieves items by their _id
  .get("/items/:_id", getSingleItem)
  //this endpoint is to update the value of the stock when the stock itself is not 0
  .patch("/cart/update-stock", updateItemStock)

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
