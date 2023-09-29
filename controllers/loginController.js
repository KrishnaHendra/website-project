const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const bitloginUrl = process.env.BITLOGIN_URL;
const integrationUrl = process.env.INTEGRATION_URL;

const loginWhatsapp = async (req, res) => {
  try {
    const {shop, code} = req.query;

    const {
      data: {
        data: {accessToken},
      },
    } = await axios.get(`${integrationUrl}/shopify/BITLOGIN/auth/${shop}`);
    if (!accessToken) {
      return res.json({
        message: "Access token not found",
      });
    }

    const {
      data: {
        shop: {name: shopName},
      },
    } = await axios.get(`https://${shop}/admin/api/2022-04/shop.json`, {
      headers: {
        "X-Shopify-Access-Token": accessToken,
      },
    });

    const {data: barcodeData} = await axios.get(
      `${bitloginUrl}/login/whatsapp/barcode/${shop}?code=${code}`
    );

    res.render("whatsappLogin", {
      barcodeData,
      shop,
      apiUrl: process.env.BASE_URL,
      shopName,
    });
  } catch (err) {
    res.status(500).json({
      message: "Some error occured",
      error: err.message,
      detail: err,
    });
  }
};

const loginWhatsappWithDomain = async (req, res) => {
  try {
    const {data: integration} = await axios.get(
      `${bitloginUrl}/integrations/shopify`,
      {
        params: {
          domain: shop,
        },
      }
    );
    if (integration.data.length === 0) {
      return res.json({
        message: "Company integration not found",
      });
    }
    const companyId = integration.data[0].companyId;
    // System Login
    // const {
    //   data: {
    //     data: {name: company},
    //   },
    // } = await axios.get(`${apiUrl}/system-login/company/${companyId}`);
    const {
      data: {
        data: {name: company},
      },
    } = await axios.get(
      `https://staging.api.bitbybit.studio/system-login/company/${companyId}`
    );

    res.status(200).json({
      message: "Success",
      company,
    });
  } catch (err) {
    res.status(500).json({
      message: "Some error occured",
      error: err.message,
      detail: err,
    });
  }
};

const loginSuccess = async (req, res) => {
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
      message: "Some error occured",
      error: err.message,
      detail: err,
    });
  }
};

module.exports = {
  loginWhatsapp,
  loginWhatsappWithDomain,
  loginSuccess,
};
