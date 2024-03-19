import Joi from "joi";
import { deleteComment } from "../../services/comment.service.js";
import { abort } from "../../../helper/abort.js";

async function validate(commentId) {
  try {
    const schema = Joi.object({
      commentId: Joi.number().required(),
    });

    return await schema.validateAsync(commentId);
  } catch (error) {
    return abort(500, "Validate error: " + error.message);
  }
}

export async function deleteCommentController(req, res) {
  try {
    const { commentId } = req.params;
    await validate(commentId);
    const comment = await deleteComment(commentId);
    res.status(200).json(comment);
  } catch (error) {
    return abort(500, error.message);
  }
}
