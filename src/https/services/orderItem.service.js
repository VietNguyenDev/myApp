import db from "../../models/db.js";
import { abort } from "../../helper/abort.js";

export async function createOrderItem(cartId, params) {
  try {
    const cart = await db.Cart.findByPk(cartId);

    if (!cart) {
      return abort(404, "Cart not found");
    }

    const OrderItem = await db.OrderItem.create({
      productId: params.productId,
      quantity: params.quantity,
      productColor: params.productColor,
      productSize: params.productSize,
    });

    return OrderItem;
  } catch (error) {
    return abort(500, error.message);
  }
}

export async function getOrderItem(id) {
  try {
    const orderItem = await db.OrderItem.findByPk(id);

    if (!orderItem) {
      return abort(404, "Order item not found");
    }

    return orderItem;
  } catch (error) {
    return abort(500, error.message);
  }
}

export async function updateOrderItem(id, params) {
  try {
    const orderItem = await getOrderItem(id);

    if (!orderItem) {
      return abort(404, "Order item not found");
    }

    const data = await db.OrderItem.update(
      {
        productId: params.productId,
        quantity: params.quantity,
        productColor: params.productColor,
        productSize: params.productSize,
        subTotal:
          quantity * db.Product.sellingPrice * (db.Product.discount / 100),
      },
      {
        where: {
          id: id,
        },
      }
    );

    return data;
  } catch (error) {
    return abort(500, error.message);
  }
}

export async function removeOrderItem(id) {
  try {
    const orderItem = await getOrderItem(id);

    if (!orderItem) {
      return abort(404, "Order item not found");
    }

    await orderItem.destroy();
  } catch (error) {
    return abort(500, error.message);
  }
}
