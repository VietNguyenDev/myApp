import Joi from "joi";
import { updateCategory } from "../../services/categories.service.js";
import { abort } from "../../../helper/abort.js";

async function validate(categoryId, params) {
  try {
    const schema = Joi.object({
      categoryId: Joi.number().required(),
      params: Joi.object({
        categoryName: Joi.string().required(),
      }),
    });

    return await schema.validateAsync({
      categoryId: categoryId,
      params: params,
    });
  } catch (error) {
    return abort(500, "Validate error: " + error.message);
  }
}

export async function updateCategoryController(req, res) {
  try {
    const { categoryId } = req.params;
    const params = req.body;

    await validate(categoryId, params);

    const category = await updateCategory(categoryId, params);
    return res.status(200).json(category);
  } catch (error) {
    return abort(500, error.message);
  }
}
