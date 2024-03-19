import Joi from "joi";
import { getCommentList } from "../../services/comment.service.js";
import { abort } from "../../../helper/abort.js";

async function validate(productId, limit, page) {
  try {
    const schema = Joi.object({
      productId: Joi.number().required(),
      limit: Joi.number().required(),
      page: Joi.number().required(),
    });

    return await schema.validateAsync({ productId, limit, page });
  } catch (error) {
    return abort(500, "Validate error: " + error.message);
  }
}

export async function getAllCommentController(req, res) {
  try {
    const { productId } = req.params;
    const { limit, page } = req.query;
    await validate(productId, limit, page);
    const comments = await getCommentList(productId, limit, page);
    res.status(200).json(comments);
  } catch {
    return abort(500, error.message);
  }
}
