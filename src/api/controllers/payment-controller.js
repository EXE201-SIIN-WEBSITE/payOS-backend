import express from "express";
import sequelize from "../../db/database.js";
const app = express();

import payOS from "../../utils/payos.js";

const domain = "http://172.188.64.221:8080";

app.post("/create-link/:orderId", async (req, res) => {
  const orderId = req.params.orderId;
  sequelize
    .query("SELECT * FROM order_detail WHERE id = ?", {
      replacements: [orderId],
      type: sequelize.QueryTypes.SELECT,
    })
    .then(async (results) => {
      const orderDetail = results[0];
      const total = orderDetail.total;
      const id = orderDetail.id;
      const { description, returnUrl, cancelUrl, amount } = req.body;
      const body = {
        orderCode: Number(String(new Date().getTime()).slice(-6)),
        amount: total,
        description: "Thanh toán đơn hàng " + id,
        cancelUrl: domain + "/api/v1/payment/cancel-payment",
        returnUrl: domain + "/api/v1/payment/success-payment?id="  + id,
      };
      try {
        const paymentLinkRes = await payOS.createPaymentLink(body);

        return res.status(200).json({
          message: "Create link payment success",
          data: {
            bin: paymentLinkRes.bin,
            checkoutUrl: paymentLinkRes.checkoutUrl,
            accountNumber: paymentLinkRes.accountNumber,
            accountName: paymentLinkRes.accountName,
            amount: paymentLinkRes.amount,
            description: paymentLinkRes.description,
            orderCode: paymentLinkRes.orderCode,
            qrCode: paymentLinkRes.qrCode,
          },
        });
      } catch (error) {
        console.log(error);
        return res.status(404).json({
          message: "Create fail",
          data: [],
        });
      }
    })
    .catch((error) => {
      console.error("Error fetching order details:", error);
    });
});

export default app;
