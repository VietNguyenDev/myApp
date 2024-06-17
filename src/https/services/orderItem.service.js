import db from "../../models/index.js";
import { abort } from "../../helper/abort.js";

export async function createOrderItem(params) {
  try {
    const product = await db.models.Product.findByPk(params.productId);
    if (!product) {
      return abort(404, "Product not found");
    }
    const subTotal =
      params.quantity * product.sellingPrice * (1 - product.discount / 100);

    const OrderItem = await db.models.OrderItem.create({
      productId: params.productId,
      quantity: params.quantity,
      productColor: params.productColor,
      productSize: params.productSize,
      subTotal: subTotal,
    });

    return OrderItem;
  } catch (error) {
    return abort(500, error.message);
  }
}

export async function getAllOrderItem() {
  try {
    const orderItems = await db.models.OrderItem.findAll();

    return orderItems;
  } catch (error) {
    return abort(500, error.message);
  }
}

export async function getOrderItem(id) {
  try {
    const orderItem = await db.models.OrderItem.findByPk(id);

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

    const product = await db.models.Product.findByPk(params.productId);
    const data = await db.models.OrderItem.update(
      {
        quantity: params.quantity,
        productColor: params.productColor,
        productSize: params.productSize,
        subTotal:
          params.quantity * product.sellingPrice * (1 - product.discount / 100),
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

    await db.models.OrderItem.destroy({
      where: {
        id: id,
      },
    });
    return "delete success";
  } catch (error) {
    return abort(500, error.message);
  }
}
