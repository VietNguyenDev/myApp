import Joi from "joi";
import { getCommentList } from "../../services/comment.service.js";
import { abort } from "../../../helper/abort.js";

async function validate(productId, limits, page) {
  try {
    const schema = Joi.object({
      productId: Joi.number().required(),
      limits: Joi.number().required(),
      page: Joi.number().required(),
    });

    return await schema.validateAsync({ productId, limits, page });
  } catch (error) {
    return abort(500, "Validate error: " + error.message);
  }
}

export async function getAllCommentController(req, res) {
  try {
    const { productId } = req.params;
    const { limits, page } = req.query;
    await validate(productId, limits, page);
    const comments = await getCommentList(productId, limits, page);
    res.status(200).json(comments);
  } catch (error) {
    return abort(500, error.message);
  }
}
