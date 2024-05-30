import Joi from "joi";
import { deleteCategory } from "../../services/categories.service.js";
import { abort } from "../../../helper/abort.js";

async function validate(categoryId) {
  try {
    const schema = Joi.object({
      categoryId: Joi.number().required(),
    });

    return await schema.validateAsync({ categoryId: categoryId });
  } catch (error) {
    return abort(500, "Validate error: " + error.message);
  }
}

export async function deleteCategoryController(req, res) {
  try {
    const { categoryId } = req.params;
    await validate(categoryId);

    const category = await deleteCategory(categoryId);
    return res.status(200).json(category);
  } catch (error) {
    return abort(500, error.message);
  }
}
