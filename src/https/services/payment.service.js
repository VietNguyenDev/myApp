import db from "../../models/index.js";
import { abort } from "../../helper/abort.js";

export async function createPayment(params) {
  try {
    const payment = await db.models.Payment.create(params);
    return payment;
  } catch (error) {
    return abort(400, error.message);
  }
}

export async function getPaymentById({ id }) {
  console.log("🚀 ~ getPaymentById ~ id:", id);
  try {
    const payment = await db.models.Payment.findByPk(id);

    if (!payment) {
      return abort(404, "Payment not found");
    }
    return payment;
  } catch (error) {
    return abort(400, error.message);
  }
}

export async function getPaymentByOrderId(orderId) {
  try {
    const payment = await db.models.Payment.findOne({ where: orderId });
    if (!payment) {
      return abort(404, "Payment not found");
    }
    return payment;
  } catch (error) {
    return abort(400, error.message);
  }
}

export async function getPaymentByUserId(userId) {
  try {
    const payment = await db.models.Payment.findOne({ where: userId });
    if (!payment) {
      return abort(404, "Payment not found");
    }
    return payment;
  } catch (error) {
    return abort(400, error.message);
  }
}

export async function getAllPayments() {
  try {
    const payments = await db.models.Payment.findAll();
    if (!payments) {
      return abort(404, "Payment not found");
    }
    return payments;
  } catch (error) {
    return abort(400, error.message);
  }
}

export async function updatePaymentById(id, status) {
  try {
    const payment = await db.models.Payment.findByPk(id);

    if (!payment) {
      return abort(404, "Payment not found");
    }
    const payments = await db.models.Payment.update(
      { status: status },
      {
        where: { id: id },
      }
    );
    return payments;
  } catch (error) {
    return abort(400, error.message);
  }
}

export async function getPaymentByStatus(status) {
  try {
    const payments = await db.models.Payment.findOne({ where: status });
    if (!payments) {
      return abort(404, "Payment not found");
    }
    return payments;
  } catch (error) {
    return abort(400, error.message);
  }
}
