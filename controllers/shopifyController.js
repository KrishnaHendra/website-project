const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const apiUrl = process.env.BACKEND_URL;

const postShopifyCustomer = async (req, res) => {
  try {
    const { name, email, phone, domain } = req.body;

    if (!name) {
      return res.json({
        success: false,
        message: "[Error] Name is required!",
      });
    }
    if (!email) {
      return res.json({
        success: false,
        message: "[Error] Email is required!",
      });
    }
    if (
      !email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      return res.json({
        success: false,
        message: "[Error] Email format is incorrect!",
      });
    }

    const { data } = await axios.post(
      `${apiUrl}/bitlogin/api/shopify/customer`,
      {
        name,
        email,
        phone,
        domain,
      }
    );

    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({
      message: "Some error occured",
      error: err.message
    });
  }
};

module.exports = {
  postShopifyCustomer,
};
