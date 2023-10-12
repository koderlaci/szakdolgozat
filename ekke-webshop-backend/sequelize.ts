import { Sequelize } from "sequelize";
import express from "express";
import cors from "cors";

//routes
import user from "./routes/user.route.js";
import shipping_address from "./routes/shipping-address.route.js";
import product from "./routes/product.route.js";

const port = 4201;
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
const app = express();

app.use(cors(corsOptions));

//routes
app.use("/user", user);
app.use("/shipping-address", shipping_address);
app.use("/product", product);

const sequelize = new Sequelize("ekke-webshop", "root", "", {
  host: "localhost",
  dialect: "mysql",
  define: {
    freezeTableName: true,
  },
});

const initApp = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    app.listen(port, () => {
      console.log(`Server is running at: http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error.original);
  }
};

initApp();
