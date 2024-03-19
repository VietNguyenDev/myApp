import db from "../../models/db.js";
import { abort } from "../../helper/abort.js";

export async function addComment(params) {
  try {
    const product = await db.products.findByPk(params.productId);
    if (!product) {
      return abort(404, "Product not found");
    }

    const comment = await db.comments.create({
      ...params,
    });
    return comment;
  } catch (error) {
    return abort(500, error.message);
  }
}

export async function getCommentList(productId, limit, page) {
  try {
    const offset = (page - 1) * limit;

    const comments = await db.comments.findAll({
      where: {
        productId,
      },
      limit,
      offset,
    });
    return comments;
  } catch (error) {
    return abort(500, error.message);
  }
}

export async function deleteComment(commentId) {
  try {
    const comment = await db.comments.findByPk(commentId);

    if (!comment) {
      return abort(404, "Comment not found");
    }

    await db.comments.destroy({
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
    const comment = await db.comments.findByPk(commentId);
    if (!comment) {
      return abort(404, "Comment not found");
    }

    const data = await db.comments.update(content, {
      where: {
        id: commentId,
      },
    });

    return data;
  } catch (error) {
    return abort(500, error.message);
  }
}
