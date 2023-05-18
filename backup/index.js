const axios = require("axios");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const port = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());
app.set("view engine", "ejs");

app.get("/success", async (req, res) => {
  try {
    const { code, type } = req.query;
    const apiUrl = process.env.BACKEND_URL;
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
    res.status(500).json(err);
  }
});

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Dashboard bitLogin Frontend",
  });
});

app.get("/login", async (req, res) => {
  const { shop, code } = req.query;

  const apiUrl = process.env.BACKEND_URL;
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
      message: "Company integration not found",
    });
  }

  const companyId = integration.data[0].companyId;
  const {
    data: {
      data: { name },
    },
  } = await axios.get(`${apiUrl}/system-login/company/${companyId}`);

  const { data: barcodeData } = await axios.get(
    `${apiUrl}/bitlogin/api/login/whatsapp/barcode/${shop}?code=${code}`
  );

  res.render("whatsappLogin", {
    barcodeData,
    shop,
    apiUrl,
    company: name,
  });
});

app.post("/shopify/customer", async (req, res) => {
  try {
    const { name, email, phone, domain } = req.body;
    const apiUrl = process.env.SOCKET_URL;

    if (!name) {
      return res.json({
        success: false,
        message: "Name is required!",
      });
    }
    if (!email) {
      return res.json({
        success: false,
        message: "Email is required!",
      });
    }
    if (
      !email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      return res.json({
        success: false,
        message: "Email format is incorrect!",
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
      error: err.message,
      detail: err,
    });
  }
});

app.get("/translate", (req, res) => {
  try {
    let { language } = req.query;

    if (!language) language = "en";

    res.json({
      message: "Successfully get language",
      data: {
        from: "en",
        to: language,
        text: data[language],
      },
    });
  } catch (err) {
    res.status(500).json({
      message: "Some error occured",
      error: err.message,
      detail: err,
    });
  }
});

app.listen(port, (req, res) => {
  console.log(`Server running on port ${port}`);
});
