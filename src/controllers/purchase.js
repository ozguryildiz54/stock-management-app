"use strict";

const Purchase = require("../models/purchase");
const CustomError = require("../helpers/customError");
const Product = require("../models/product");

module.exports = {
  list: async (req, res) => {
    /*
            #swagger.tags = ["Purchases"]
            #swagger.summary = "List Purchases"
            #swagger.description = `
                You can use <u> filter[] & search[] & sort[] & page & limit </u> queries with endpoint.
                <ul>
                    <li> URL/?<b>filter[field1]=value1&filter[field2]=value2</b> </li>
                    <li> URL/?<b>search[field1]=value1&search[field2]=value2</b> </li>
                    <li> URL/?<b>sort[field1]=value1&sort[field2]=value2</b> </li>
                    <li> URL/?<b>page=1&limit=10</b> </li>
                </ul>
            `
        */

    const data = await res.getModelList(Purchase, {}, [
      "userId",
      "firmId",
      "brandId",
      "productId",
    ]);

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Purchase),
      data,
    });
  },

  create: async (req, res) => {
    /*
            #swagger.tags = ["Purchases"]
            #swagger.summary = "Create Purchase"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema:{ $ref: "#/definitions/Purchase" }
            }
        */

    const { productId } = req.body;

    const { brandId } = await Product.findById(productId).select(
      "brandId -_id"
    ); // {brandId}

    if (!brandId)
      throw new CustomError("The product you are looking is not found.", 404);

    req.body.userId = req.user._id;
    req.body.brandId = brandId;

    const data = await Purchase.create(req.body);

    if (data)
      await Product.findByIdAndUpdate(productId, {
        $inc: { quantity: data.quantity },
      });

    res.status(201).send({
      error: false,
      data,
    });
  },

  read: async (req, res) => {
    /*
            #swagger.tags = ["Purchases"]
            #swagger.summary = "Get Single Purchase"
        */

    const data = await Purchase.findById(req.params.id).populate([
      "userId",
      "firmId",
      "brandId",
      "productId",
    ]);

    res.status(200).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
    /*
            #swagger.tags = ["Purchases"]
            #swagger.summary = "Update Purchase"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema:{ $ref: "#/definitions/Purchase" }
            }
        */

    let currentPurchase;

    if (req.body.quantity) {
      currentPurchase = await Purchase.findById(req.params.id);
    }

    const data = await Purchase.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    });

    if (!data)
      throw new CustomError(
        "Update failed, data is not found or already updated",
        404
      );

    if (req.body.quantity) {
      // calculate differnce
      const difference = req.body.quantity - currentPurchase.quantity;

      // update product with difference
      await Product.findByIdAndUpdate(currentPurchase.productId, {
        $inc: { quantity: difference }
      });
    }

    res.status(202).send({
      error: false,
      data,
    });
  },

  dlt: async (req, res) => {
    /*
            #swagger.tags = ["Purchases"]
            #swagger.summary = "Delete Single Purchase"
        */

    const data = await Purchase.findByIdAndDelete(req.params.id);

    if (!data)
      throw new CustomError(
        "Delete failed, data is not found or already deleted",
        404
      );

    //todo purchase silinirse product update etmeli

    res.status(200).send({
      error: false,
      data,
    });
  },
};
