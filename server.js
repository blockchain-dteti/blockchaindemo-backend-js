const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const db = require("./config/database");
const accountRoute = require("./routes/loginRouter");
const doRoute = require("./routes/doRouter");
const SmartContract = require("./service/thirdweb");
const { companyInit } = require("./model/companyModel");
const { portInit } = require("./model/portModel");
const { shippingAgencyInit } = require("./model/shippingAgency");

const app = express();

(async () => {
  try {
    await db.authenticate();
    await db.sync();
    await Promise.all([companyInit(), portInit(), shippingAgencyInit()]);

    await SmartContract.init();
    console.log("SmartContract Instance Initiated");
  } catch (error) {
    console.error(error);
    return;
  }

  app.use(bodyParser.json());
  app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(express.json());

  app.use("/api/account", accountRoute);
  app.use("/api/do", doRoute);

  app.listen(5000, () => {
    console.log("Server is running");
  });
})();
