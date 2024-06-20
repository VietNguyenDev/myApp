import db from "../../models/index.js";
import { abort } from "../../helper/abort.js";

export async function createOrderDetail({ params }) {
  try {
    const OrderItem = await db.models.OrderItem.findAll();
    const total = OrderItem.reduce((acc, item) => {
      return acc + item.subTotal;
    }, 0);
    console.log("🚀 ~ total ~ total:", total);

    const orderDetail = await db.models.OrderDetail.create({
      shippingId: params.shippingId,
      userId: params.userId,
      orderItemId: params.orderItemId,
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

    const items = [];

    for (const item of orderItems) {
      const orderItem = await db.models.OrderItem.findByPk(item.orderItemId);
      items.push(orderItem);
    }

    return items;
  } catch (error) {
    return abort(500, error.message);
  }
}
