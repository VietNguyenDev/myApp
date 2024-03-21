import Joi from "joi";
import { createCategory } from "../../services/categories.service.js";
import { abort } from "../../../helper/abort.js";

async function validate({ categoryName }) {
  try {
    const schema = Joi.object({
      categoryName: Joi.string().required(),
    });

    return await schema.validateAsync({ categoryName: categoryName });
  } catch (error) {
    return abort(500, "Validate error: " + error.message);
  }
}

export async function createCategoryController(req, res) {
  try {
    const { categoryName } = req.body;
    await validate({ categoryName });

    const category = await createCategory(categoryName);
    return res.status(200).json(category);
  } catch (error) {
    return abort(500, error.message);
  }
}
