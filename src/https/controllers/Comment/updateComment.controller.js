import Joi from "joi";
import { updateComment } from "../../services/comment.service.js";
import { abort } from "../../../helper/abort.js";

async function validate(commentId, content) {
  try {
    const schema = Joi.object({
      commentId: Joi.number().required(),
      content: Joi.string().required(),
    });

    return await schema.validateAsync({ commentId, content });
  } catch (error) {
    return abort(500, "Validate error: " + error.message);
  }
}

export async function updateCommentController(req, res) {
  try {
    const { commentId } = req.params;
    const content = req.body;

    await validate(commentId, content);
    const comment = await updateComment(commentId, content);
    res.status(200).json(comment);
  } catch (error) {
    return abort(500, error.message);
  }
}
