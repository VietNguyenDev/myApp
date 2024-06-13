import db from "../../models/index.js";
import { abort } from "../../helper/abort.js";

export async function getAllFavorite({ limit, page }) {
  const offset = (page - 1) * limit;
  const limits = parseInt(limit);
  try {
    const favorites = await db.models.Favorite.findAndCountAll({
      limits,
      offset,
    });
    return {
      total: favorites.count,
      data: favorites.rows,
    };
  } catch (error) {
    return abort(500, error.message);
  }
}

export async function createFavoriteProd(params) {
  console.log("🚀 ~ createFavoriteProd ~ params:", params);
  try {
    const favorite = await db.models.Favorite.create({
      productId: params.productId,
      userId: params.userId,
    });

    return favorite;
  } catch (error) {
    return abort(500, error.message);
  }
}

export async function removeFavoriteProd({ id }) {
  try {
    const favorite = await db.models.Favorite.findOne({ id });
    if (!favorite) {
      return abort(404, "Favorite not found");
    }

    const data = await db.models.Favorite.destroy({
      where: {
        id: id,
      },
    });

    return "Favorite deleted";
  } catch (error) {
    return abort(500, error.message);
  }
}
