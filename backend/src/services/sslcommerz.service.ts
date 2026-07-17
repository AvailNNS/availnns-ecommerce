import axios from "axios";
import sslcommerzConfig from "../config/sslcommerz";

// ===============================
// CREATE SSL PAYMENT SESSION
// ===============================
export const createSSLPayment = async (paymentData: any) => {
  try {
    const response = await axios.post(
      `${sslcommerzConfig.base_url}/gwprocess/v4/api.php`,
      {
        store_id: sslcommerzConfig.store_id,
        store_passwd: sslcommerzConfig.store_password,
        total_amount: paymentData.amount,
        currency: "BDT",
        tran_id: paymentData.transactionId,
        success_url: sslcommerzConfig.success_url,
        fail_url: sslcommerzConfig.fail_url,
        cancel_url: sslcommerzConfig.cancel_url,
        product_name: paymentData.productName || "Product",
        product_category: "Ecommerce",
        product_profile: "general",
        cus_name: paymentData.customerName,
        cus_email: paymentData.email,
        cus_add1: paymentData.address,
        cus_city: paymentData.city,
        cus_country: "Bangladesh",
      }
    );

    return response.data;
  } catch (error: any) {
    console.log("SSL PAYMENT ERROR:", error.message);
    throw error;
  }
};