import Joi from "joi";
import { addComment } from "../../services/comment.service.js";
import { abort } from "../../../helper/abort.js";

async function validate(params) {
  try {
    const schema = Joi.object({
      userId: Joi.number().required(),
      productId: Joi.number().required(),
      comment: Joi.string().required(),
      rating: Joi.number().required(),
    });

    return await schema.validateAsync(params);
  } catch (error) {
    return abort(500, "Validate error: " + error.message);
  }
}

export async function createCommentController(req, res) {
  try {
    const params = req.body;
    await validate(params);
    const comment = await addComment(params);
    res.status(200).json(comment);
  } catch (error) {
    return abort(500, error.message);
  }
}
