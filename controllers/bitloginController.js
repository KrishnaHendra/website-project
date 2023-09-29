const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const bitloginUrl = process.env.BITLOGIN_URL;
const integrationUrl = process.env.INTEGRATION_URL;

const getAuthWhatsapp = async (req, res) => {
  try {
    const {code, domain} = req.query;

    const {
      data: {
        data: {accessToken},
      },
    } = await axios.get(`${integrationUrl}/shopify/BITLOGIN/auth/${domain}`);
    if (!accessToken) {
      return res.json({
        message: "Access token not found",
      });
    }

    const {
      data: {
        shop: {name: shopName},
      },
    } = await axios.get(`https://${domain}/admin/api/2022-04/shop.json`, {
      headers: {
        "X-Shopify-Access-Token": accessToken,
      },
    });

    const {data: barcodeData} = await axios.get(
      `${bitloginUrl}/login/whatsapp/barcode/${domain}?code=${code}`
    );

    res.render("whatsappLogin", {
      barcodeData,
      shop: domain,
      apiUrl: process.env.BASE_URL,
      shopName,
    });
  } catch (err) {
    res.status(500).json({
      message: "Some error occured on [getAuthWhatsapp]",
      error: err.message,
      detail: err,
    });
  }
};

const handleSuccessLogin = async (req, res) => {
  try {
    const {code, type} = req.query;

    const {data} = await axios.get(
      `${bitloginUrl}/login/whatsapp/status?code=${code}`
    );
    const whatsappNumber = process.env.WHATSAPP_NUMBER;

    res.render("successPage", {
      data,
      type,
      whatsappNumber,
    });
  } catch (err) {
    res.status(500).json({
      message: "Some error occured on [handleSuccessLogin]",
      error: err.message,
      detail: err,
    });
  }
};

module.exports = {
  getAuthWhatsapp,
  handleSuccessLogin,
};
