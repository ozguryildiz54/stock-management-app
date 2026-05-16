"use strict";

const Product = require("../models/product");
const CustomError = require("../helpers/customError");

module.exports = {
  list: async (req, res) => {
    /*
            #swagger.tags = ["Products"]
            #swagger.summary = "List Products"
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

    const data = await res.getModelList(Product, {}, [
      "categoryId",
      "brandId",
    ]);

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Product),
      data,
    });
  },

  create: async (req, res) => {
    /*
            #swagger.tags = ["Products"]
            #swagger.summary = "Create Product"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema:{ $ref: "#/definitions/Product" }
            }
        */

    const data = await Product.create(req.body);

    res.status(201).send({
      error: false,
      data,
    });
  },

  read: async (req, res) => {
    /*
            #swagger.tags = ["Products"]
            #swagger.summary = "Get Single Product"
        */

    const data = await Product.findById(req.params.id).populate([
      "categoryId",
      "brandId",
    ]);

    res.status(200).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
    /*
            #swagger.tags = ["Products"]
            #swagger.summary = "Update Product"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema:{ $ref: "#/definitions/Product" }
            }
        */

    const data = await Product.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    });

    if (!data)
      throw new CustomError(
        "Update failed, data is not found or already updated",
        404
      );

    res.status(202).send({
      error: false,
      data,
    });
  },

  dlt: async (req, res) => {
    /*
            #swagger.tags = ["Products"]
            #swagger.summary = "Delete Single Product"
        */

    const data = await Product.findByIdAndDelete(req.params.id);

    if (!data)
      throw new CustomError(
        "Delete failed, data is not found or already deleted",
        404
      );

    res.status(200).send({
      error: false,
      data,
    });
  },
};
