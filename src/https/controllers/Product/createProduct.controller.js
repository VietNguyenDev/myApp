import Joi from "joi";
import { create } from "../../services/products.service.js";
import { abort } from "../../../helper/abort.js";

async function validate(params) {
  try {
    const schema = Joi.object({
      params: Joi.object({
        productName: Joi.string().required(),
        sellingPrice: Joi.number().required(),
        productDescription: Joi.string().required(),
        productImage: Joi.string().required(),
        categoryId: Joi.number().required(),
        productQuantity: Joi.number().required(),
        productSize: Joi.string().required(),
        discount: Joi.number().required(),
      }),
    });

    return await schema.validateAsync(params);
  } catch (error) {
    return abort(500, "Validate error: " + error.message);
  }
}

export async function createController(req, res) {
  try {
    const params = req.body;
    await validate(params);

    const product = await create(params);

    return res.status(200).json(product);
  } catch (error) {
    return abort(400, error);
  }
}
