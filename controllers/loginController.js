const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const loginWhatsappWithDomain = async (req, res) => {
  try {
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


module.exports = {
  loginWhatsapp,
  loginWhatsappWithDomain,
  loginSuccess,
};
