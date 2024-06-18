import db from "../../models/index.js";
import { abort } from "../../helper/abort.js";

export async function createShippingDetail(params) {
  try {
    const ShippingDetail = await db.models.ShippingDetail.create({
      userId: params.userId,
      fullName: params.fullName,
      address: params.address,
      phone: params.phone,
    });

    return ShippingDetail;
  } catch (error) {
    return abort(500, error.message);
  }
}

export async function getAllShippingDetail(limits) {
  try {
    const limit = parseInt(limits);

    const shippingDetails = await db.models.ShippingDetail.findAndCountAll({
      limit,
    });

    return shippingDetails;
  } catch (error) {
    return abort(500, error.message);
  }
}

export async function removeShippingDetail(id) {
  try {
    const shippingDetail = await db.models.ShippingDetail.findByPk(id);

    if (!shippingDetail) {
      return abort(404, "Shipping detail not found");
    }

    await db.models.ShippingDetail.destroy({ where: { id: id } });

    return "delete success";
  } catch (error) {
    return abort(500, error.message);
  }
}

export async function updateShippingDetail(id, params) {
  try {
    const shippingDetail = await db.models.ShippingDetail.findByPk(id);

    if (!shippingDetail) {
      return abort(404, "Shipping detail not found");
    }

    await db.models.ShippingDetail.update(
      {
        fullName: params.fullName,
        address: params.address,
        phone: params.phone,
      },
      { where: { id: id } }
    );

    return "update success";
  } catch (error) {
    return abort(500, error.message);
  }
}
