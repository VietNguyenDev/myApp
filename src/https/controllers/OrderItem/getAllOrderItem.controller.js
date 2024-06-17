import { getAllOrderItem } from "../../services/orderItem.service.js";
import { abort } from "../../../helper/abort.js";

export async function getAllOrderItemController(req, res) {
  try {
    const orderItems = await getAllOrderItem();
    res.status(200).json(orderItems);
  } catch (error) {
    return abort(500, error.message);
  }
}
