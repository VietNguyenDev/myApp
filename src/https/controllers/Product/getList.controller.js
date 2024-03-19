import Joi from "joi";
import { getList } from "../../services/products.service.js";
import { abort } from "../../../helper/abort.js";

async function validate(limits, page) {
  try {
    const schema = Joi.object({
      limits: Joi.number().required(),
      page: Joi.number().required(),
    });

    return await schema.validateAsync({ limits, page });
  } catch (error) {
    return abort(500, "Validate error: " + error.message);
  }
}

export async function getListController(req, res) {
  try {
    const { limits, page } = req.query;
    await validate({ limits, page });
    const products = await getList({ limits, page });
    return res.status(200).json(products);
  } catch (error) {
    return abort(400, error);
  }
}
