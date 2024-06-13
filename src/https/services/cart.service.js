import db from "../../models/index.js";
import { abort } from "../../helper/abort.js";

export async function addProdToCart(params) {
  try {
    const product = await db.models.Product.findByPk(params.productId);
    if (!product) {
      return abort(404, "Product not found");
    }

    const subTotal = product.price * params.quantity;

    const cart = await db.models.Cart.create({
      ...params,
      subTotal,
    });
    return cart;
  } catch (error) {
    return abort(500, error.message);
  }
}

export async function getCartList(userId, limit, page) {
  try {
    const offset = (page - 1) * limit;
    const limits = parseInt(limit);

    const cart = await db.models.Cart.findAll({
      where: {
        userId,
      },
      limits,
      offset,
    });
    return cart;
  } catch (error) {
    return abort(500, error.message);
  }
}

export async function deleteProdFromCart({ userId, productId, id }) {
  try {
    const product = await db.models.Cart.findOne({
      where: {
        userId,
        productId,
      },
    });

    if (!product) {
      return abort(404, "Product not found in cart");
    }

    await db.models.Cart.destroy({
      where: {
        id: id,
      },
    });

    return "Product deleted";
  } catch (error) {
    return abort(500, error.message);
  }
}
