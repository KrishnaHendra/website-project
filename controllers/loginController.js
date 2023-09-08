const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const apiUrl = process.env.BACKEND_URL;

const loginWhatsappWithDomain = async (req, res) => {
  try {
    const { data: integration } = await axios.get(
      `${apiUrl}/bitlogin/api/integrations/shopify`,
      {
        params: {
          domain: shop,
        },
      }
    );
    if (integration.data.length === 0) {
      return res.json({
        message: "[Error] Company integration not found",
      });
    }
    const companyId = integration.data[0].companyId;
    const {
      data: {
        data: { name: company },
      },
    } = await axios.get(`${apiUrl}/system-login/company/${companyId}`);

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
    const { code, type } = req.query;

    const { data } = await axios.get(
      `${apiUrl}/bitlogin/api/login/whatsapp/status?code=${code}`
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
