import "dotenv/config";


const sslcommerzConfig = {

  store_id:
    process.env.SSL_STORE_ID || "",


  store_password:
    process.env.SSL_STORE_PASSWORD || "",


  is_live:
    process.env.SSL_IS_LIVE === "true",


  success_url:
    process.env.SSL_SUCCESS_URL || "",


  fail_url:
    process.env.SSL_FAIL_URL || "",


  cancel_url:
    process.env.SSL_CANCEL_URL || "",


  base_url:
    process.env.SSL_BASE_URL ||
    "https://sandbox.sslcommerz.com",

};


export default sslcommerzConfig;