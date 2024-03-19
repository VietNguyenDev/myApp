import db from "../../models/db.js";
import { abort } from "../../helper/abort.js";

export async function getAllFavorite({ limit, page }) {
  const offset = (page - 1) * limit;
  try {
    const favorites = await db.Favorite.findAndCountAll({
      limit,
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
  try {
    const favorite = await db.Favorite.create({
      productId: params.productId,
      userId: params.userId,
    });

    return favorite;
  } catch {
    return abort(500, error.message);
  }
}

export async function removeFavoriteProd(params) {
  try {
    const favorite = await db.Favorite.destroy({
      where: {
        productId: params.productId,
        userId: params.userId,
      },
    });

    return favorite;
  } catch (error) {
    return abort(500, error.message);
  }
}
