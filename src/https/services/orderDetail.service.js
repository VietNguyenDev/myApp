import db from "../../models/orderDetail.model.js";
import { abort } from "../../helper/abort.js";

export async function createOrderDetail(orderId, params) {
  try {
    const order = await db.Order.findByPk(orderId);

    if (!order) {
      return abort(404, "Order not found");
    }

    const orderDetail = await db.OrderDetail.create({
      productId: params.productId,
      total: db.OrderItem.subTotal,
      productColor: params.productColor,
      productSize: params.productSize,
    });

    return orderDetail;
  } catch (error) {
    return abort(500, error.message);
  }
}
