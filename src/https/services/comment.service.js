import db from "../../models/index.js";
import { abort } from "../../helper/abort.js";

export async function addComment({ params }) {
  try {
    const product = await db.models.Product.findByPk(params.productId);
    if (!product) {
      return abort(404, "Product not found");
    }

    const comment = await db.models.Comment.create({
      ...params,
    });
    return comment;
  } catch (error) {
    return abort(500, error.message);
  }
}

export async function getCommentList(productId, limits, page) {
  try {
    const offset = (page - 1) * limits;

    const comments = await db.models.Comment.findAll({
      where: {
        productId,
      },
      limits,
      offset,
    });
    return "Comment updated";
  } catch (error) {
    return abort(500, error.message);
  }
}

export async function deleteComment(commentId) {
  try {
    const comment = await db.models.Comment.findByPk(commentId);

    if (!comment) {
      return abort(404, "Comment not found");
    }

    await db.models.Comment.destroy({
      where: {
        id: commentId,
      },
    });

    return "Comment deleted";
  } catch (error) {
    return abort(500, error.message);
  }
}

export async function updateComment(commentId, content) {
  try {
    const comment = await db.models.Comment.findByPk(commentId);
    if (!comment) {
      return abort(404, "Comment not found");
    }

    const data = await db.models.Comment.update(content, {
      where: {
        id: commentId,
      },
    });

    return data;
  } catch (error) {
    return abort(500, error.message);
  }
}
