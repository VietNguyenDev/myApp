import { getAllPayments } from "../../services/payment.service.js";
import { abort } from "../../../helper/abort.js";

export async function getAllPaymentController(req, res) {
  try {
    const payments = await getAllPayments();
    return res.status(200).send({
      message: "Get all payments successfully",
      payments,
    });
  } catch (error) {
    return abort(400, error.message);
  }
}
