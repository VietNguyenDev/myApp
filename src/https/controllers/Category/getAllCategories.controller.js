import Joi from "joi";
import { getAllCategories } from "../../services/categories.service.js";
import { abort } from "../../../helper/abort.js";

async function validate({ limits, page }) {
  try {
    const schema = Joi.object({
      limits: Joi.number().required().min(1),
      page: Joi.number().required().min(1),
    });

    return await schema.validateAsync({ limits, page });
  } catch (error) {
    return abort(500, "Validate error: " + error.message);
  }
}

export async function getAllCategoriesController(req, res) {
  try {
    const { limits, page } = req.query;
    console.log(
      "🚀 ~ getAllCategoriesController ~ limits, page :",
      limits,
      page
    );
    await validate({ limits, page });

    const categories = await getAllCategories({ limits, page });
    return res.status(200).json(categories);
  } catch (error) {
    return abort(500, error.message);
  }
}
