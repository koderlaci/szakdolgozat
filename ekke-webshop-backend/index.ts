import express from "express";
import mysql from "mysql";
import cors from "cors";
import bodyParser from "body-parser";
import sha1 from "sha1";

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

const app = express();
const port = 4201;
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(cors(corsOptions));

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "ekke-webshop",
});

con.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// get all users
app.get("/allusers", (request, response) => {
  let query = "SELECT * FROM `user`";

  con.query(query, (err, result) => {
    if (err) throw err;
    response.send(result);
  });
});

// add user
app.post("/adduser", jsonParser, (request, response) => {
  let query = `INSERT INTO user SET ?`;

  let formData = {
    name: request.body.name,
    neptun: request.body.neptun,
    email: request.body.email,
    password: sha1(request.body.password),
    permission: 0,
  };

  if (
    !formData.name ||
    !formData.neptun ||
    !formData.email ||
    !request.body.password
  ) {
    response.send(false);
  } else {
    con.query(query, formData, (err, result) => {
      if (err) throw err;
      response.send(true);
    });
  }
});

// edit user
app.post("/edituser/:id", (request, response) => {
  let formData = {
    name: request.body.name,
    neptun: request.body.neptun,
    email: request.body.email,
    password: request.body.password,
    permission: 0,
  };

  con.query(
    "UPDATE user SET ? WHERE id = " + request.params.id,
    formData,
    (err, result) => {
      if (err) throw err;
      // response.redirect('/user');
    }
  );
});

// delete user
app.delete("/deleteuser/(:id)", (request, response) => {
  con.query(
    "DELETE FROM user WHERE id = " + request.params.id,
    (err, result) => {
      if (err) throw err;
      console.log("deleted user");
      // response.redirect('/user')
    }
  );
});

// login
app.post("/login", jsonParser, (request, response) => {
  con.query(
    `SELECT password FROM user WHERE email = '${request.body.email}'`,
    (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        if (result[0].password === sha1(request.body.password)) {
          response.send({
            authenticated: true,
            errorMessage: null,
          });
        } else {
          response.send({
            authenticated: false,
            errorMessage: "Helytelen email vagy jelszó!",
          });
        }
      } else {
        response.send({
          authenticated: false,
          errorMessage: "Helytelen email vagy jelszó!",
        });
      }
    }
  );
});

app.get("/shatest", jsonParser, (request, response) => {
  response.send(sha1("banana"));
});

// products

function getColors(products, variantId) {
  let colors = [];
  products.forEach((product) => {
    if (product.variant_id === variantId && !colors.includes(product.color)) {
      colors.push(product.color);
    }
  });

  return colors;
}

function getSizes(products, variantId) {
  let sizes = [];
  products.forEach((product) => {
    if (product.variant_id === variantId && !sizes.includes(product.size)) {
      sizes.push(product.size);
    }
  });

  return sizes;
}

// get men products for products screen
app.get("/menProducts", (request, response) => {
  let query = "SELECT * FROM product WHERE type = 'men'";

  con.query(query, (err, result) => {
    if (err) throw err;

    let products = [];

    let productVariants = [];

    result.forEach((product) => {
      if (!productVariants.includes(product.variant_id)) {
        products.push({
          variantId: product.variant_id,
          name: product.name,
          price: product.price,
          colors: getColors(result, product.variant_id),
        });
        productVariants.push(product.variant_id);
      }
    });

    response.send(products);
  });
});

// get women products for products screen
app.get("/womenProducts", (request, response) => {
  let query = "SELECT * FROM product WHERE type = 'women'";

  con.query(query, (err, result) => {
    if (err) throw err;

    let products = [];

    let productVariants = [];

    result.forEach((product) => {
      if (!productVariants.includes(product.variant_id)) {
        products.push({
          variantId: product.variant_id,
          name: product.name,
          price: product.price,
          colors: getColors(result, product.variant_id),
        });
        productVariants.push(product.variant_id);
      }
    });

    response.send(products);
  });
});

// get accessary products for products screen
app.get("/accessaryProducts", (request, response) => {
  let query = "SELECT * FROM product WHERE type = 'accessary'";

  con.query(query, (err, result) => {
    if (err) throw err;

    let products = [];

    let productVariants = [];

    result.forEach((product) => {
      if (!productVariants.includes(product.variant_id)) {
        products.push({
          variantId: product.variant_id,
          name: product.name,
          price: product.price,
          colors: getColors(result, product.variant_id),
        });
        productVariants.push(product.variant_id);
      }
    });

    response.send(products);
  });
});

// get all products for product-slider
app.get("/productSlider", (request, response) => {
  let query = "SELECT * FROM product";

  con.query(query, (err, result) => {
    if (err) throw err;

    let products = [];

    let productVariants = [];

    result.forEach((product) => {
      if (!productVariants.includes(product.variant_id)) {
        products.push({
          variantId: product.variant_id,
          name: product.name,
          price: product.price,
          colors: getColors(result, product.variant_id),
        });
        productVariants.push(product.variant_id);
      }
    });

    response.send(products);
  });
});

// get product for product page
app.get("/product", jsonParser, (request, response) => {
  let query = `SELECT * FROM product WHERE variant_id = '${request.query.variantId}'`;

  con.query(query, (err, result) => {
    if (err) throw err;

    let mappedProduct = {};

    let productVariants = [];

    result.forEach((product) => {
      if (!productVariants.includes(product.variant_id)) {
        mappedProduct = {
          variantId: product.variant_id,
          name: product.name,
          price: product.price,
          colors: getColors(result, product.variant_id),
          sizes: getSizes(result, product.variant_id),
        };
        productVariants.push(product.variant_id);
      }
    });

    response.send(mappedProduct);
  });
});
