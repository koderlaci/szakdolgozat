import { Sequelize } from "sequelize";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import "dotenv/config.js";

// routes
import user from "./routes/user.route.js";
import user_address from "./routes/user-address.route.js";
import order_address from "./routes/order-address.route.js";
import product from "./routes/product.route.js";
import cart from "./routes/cart.route.js";
import cart_item from "./routes/cart-item.route.js";
import order from "./routes/user-order.route.js";

// models
import { CartItem } from "./models/cart-item.model.js";
import { User } from "./models/user.model.js";
import { Cart } from "./models/cart.model.js";
import { Product } from "./models/product.model.js";
import { UserAddress } from "./models/user-address.model.js";
import { UserOrder } from "./models/user-order.model.js";
import { OrderAddress } from "./models/order-address.model.js";

const port = process.env.PORT || 4201;
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
const app = express();

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//routes
app.use("/user", user);
app.use("/user-address", user_address);
app.use("/order-address", order_address);
app.use("/product", product);
app.use("/cart", cart, cart_item);
app.use("/order", order);

const sequelize = new Sequelize(
  process.env.NODE_ENV ? process.env.DATABASE_USERNAME : "ekke-webshop",
  process.env.NODE_ENV ? process.env.DATABASE_USERNAME : "root",
  process.env.NODE_ENV ? process.env.DATABASE_PASSWORD : "",
  {
    host: process.env.NODE_ENV ? process.env.DATABASE_URL : "localhost",
    dialect: "mysql",
    define: {
      freezeTableName: true,
    },
  }
);

const initApp = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    // user associations
    User.hasMany(CartItem, {
      foreignKey: {
        name: "userId",
        field: "user_id",
        allowNull: false,
      },
    });
    CartItem.belongsTo(User, {
      foreignKey: {
        name: "userId",
        field: "user_id",
        allowNull: false,
      },
    });

    User.hasOne(UserAddress, {
      foreignKey: {
        name: "userId",
        field: "user_id",
        allowNull: false,
      },
    });
    UserAddress.belongsTo(User, {
      foreignKey: {
        name: "userId",
        field: "user_id",
        allowNull: false,
      },
    });

    User.hasMany(Cart, {
      foreignKey: {
        name: "userId",
        field: "user_id",
        allowNull: false,
      },
    });
    Cart.belongsTo(User, {
      foreignKey: {
        name: "userId",
        field: "user_id",
        allowNull: false,
      },
    });

    User.hasMany(UserOrder, {
      foreignKey: {
        name: "userId",
        field: "user_id",
        allowNull: false,
      },
    });
    UserOrder.belongsTo(User, {
      foreignKey: {
        name: "userId",
        field: "user_id",
        allowNull: false,
      },
    });

    // product associations
    Product.hasMany(CartItem, {
      foreignKey: {
        name: "productId",
        field: "product_id",
        allowNull: false,
      },
    });
    CartItem.belongsTo(Product, {
      foreignKey: {
        name: "productId",
        field: "product_id",
        allowNull: false,
      },
    });

    // cart associations
    Cart.hasMany(CartItem, {
      foreignKey: {
        name: "cartId",
        field: "cart_id",
        allowNull: false,
      },
    });
    CartItem.belongsTo(Cart, {
      foreignKey: {
        name: "cartId",
        field: "cart_id",
        allowNull: false,
      },
    });

    Cart.hasOne(UserOrder, {
      foreignKey: {
        name: "cartId",
        field: "cart_id",
        allowNull: false,
      },
    });
    UserOrder.belongsTo(Cart, {
      foreignKey: {
        name: "cartId",
        field: "cart_id",
        allowNull: false,
      },
    });

    // order-address associations
    OrderAddress.hasOne(UserOrder, {
      foreignKey: {
        name: "addressId",
        field: "address_id",
        allowNull: false,
      },
    });
    UserOrder.belongsTo(OrderAddress, {
      foreignKey: {
        name: "addressId",
        field: "address_id",
        allowNull: false,
      },
    });

    app.listen(port, () => {
      console.log(`Server is running at: http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error.original);
  }
};

initApp();
