import db from "../../models/index.js";
import { abort } from "../../helper/abort.js";

export async function createOrderDetail(params) {
  try {
    const OrderItem = await db.models.OrderItem.findAll();
    const total = OrderItem.reduce((acc, item) => {
      return acc + item.price;
    }, 0);
    const orderDetail = await db.OrderDetail.create({
      shippingId: params.shippingId,
      total: total,
    });

    return orderDetail;
  } catch (error) {
    return abort(500, error.message);
  }
}

export async function getOrderDetailById(id) {
  try {
    const orderDetail = await db.models.OrderDetail.findByPk(id);
    if (!orderDetail) {
      return abort(404, "OrderDetail not found");
    }

    const orderItems = await db.models.OrderDetail.findAll({
      where: {
        id: id,
      },
      attributes: ["orderItemId"],
    });

    const orderItem = [];

    for (const item of orderItems) {
      const orderItem = await db.models.OrderItem.findByPk(item.orderItemId);
      orderItem.push(orderItem);
    }

    return orderItem;
  } catch (error) {
    return abort(500, error.message);
  }
}
