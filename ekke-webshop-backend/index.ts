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
app.get("/all-users", (request, response) => {
  let query = "SELECT * FROM `user`";

  con.query(query, (err, result) => {
    if (err) throw err;
    response.send(result);
  });
});

// add user
app.post("/add-user", jsonParser, (request, response) => {
  let query = `INSERT INTO user SET ?`;

  let formData = {
    name: request.body.name,
    neptun: request.body.neptun,
    email: request.body.email,
    password: sha1(request.body.password),
    permission: 0,
  };

  let responseDto = {
    error: false,
    message: null,
  };

  if (
    !formData.name ||
    !formData.neptun ||
    !formData.email ||
    !request.body.password
  ) {
    responseDto.error = true;
    responseDto.message = "Kérjük minden adatot adj meg.";
    response.send(responseDto);
  } else {
    con.query(query, formData, (err, result) => {
      if (err) {
        responseDto.error = true;
        switch (err.code) {
          case "ER_DUP_ENTRY":
            responseDto.message =
              "A megadott adatokkal már létezik felhasználó.";
            break;
          default:
            responseDto.message = "Hiba történt, kérjük próbáld újra.";
        }
      }
      response.send(responseDto);
    });
  }
});

// edit user
app.post("/edit-user/:id", (request, response) => {
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
app.delete("/delete-user/(:id)", (request, response) => {
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
  let responseDto = {
    authenticated: false,
    errorMessage: null,
  };

  con.query(
    `SELECT password FROM user WHERE email = '${request.body.email}'`,
    (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        if (result[0].password === sha1(request.body.password)) {
          responseDto.authenticated = true;
          responseDto.errorMessage = null;
        } else {
          responseDto.authenticated = false;
          responseDto.errorMessage = "Helytelen email vagy jelszó!";
        }
      } else {
        responseDto.authenticated = false;
        responseDto.errorMessage = "Helytelen email vagy jelszó!";
      }
      response.send(responseDto);
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
app.get("/men-products", (request, response) => {
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
app.get("/women-products", (request, response) => {
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
app.get("/accessary-products", (request, response) => {
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
app.get("/product-slider", (request, response) => {
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

// get product's sizes by variantId and color
app.get("/product-sizes", jsonParser, (request, response) => {
  let query = `SELECT size FROM product WHERE variant_id = '${request.query.variantId}' AND color = '${request.query.color}'`;

  con.query(query, (err, result) => {
    if (err) throw err;

    let sizes = [];

    result.forEach((sizeElement) => {
      sizes.push(sizeElement.size);
    });

    response.send(sizes);
  });
});

// get product's colors by variantId and size
app.get("/product-colors", jsonParser, (request, response) => {
  let query = `SELECT color FROM product WHERE variant_id = '${request.query.variantId}' AND size = '${request.query.size}'`;

  con.query(query, (err, result) => {
    if (err) throw err;

    let colors = [];

    result.forEach((colorElement) => {
      colors.push(colorElement.color);
    });

    response.send(colors);
  });
});

// get final product for cart by the product's details
app.get("/product-final", jsonParser, (request, response) => {
  let query = `SELECT * FROM product WHERE variant_id = '${request.query.variantId}' AND color = '${request.query.color}' AND size = '${request.query.size}'`;

  con.query(query, (err, result) => {
    if (err) throw err;

    let mappedProduct = {
      id: result[0].id,
      variantId: result[0].variant_id,
      name: result[0].name,
      type: result[0].type,
      style: result[0].style,
      color: result[0].color,
      size: result[0].size,
      price: result[0].price,
      quantity: result[0].quantity,
    };

    response.send(mappedProduct);
  });
});

// add shipping address
app.post("/add-shipping-address", jsonParser, (request, response) => {
  let formData = {
    country: request.body.country,
    zip_code: request.body.zip_code,
    city: request.body.city,
    street_name: request.body.street_name,
    street_type: request.body.street_type,
    house_number: request.body.house_number,
    apartment: request.body.apartment,
    floor: request.body.floor,
    door: request.body.door,
  };

  let responseDto = {
    error: false,
    message: null,
  };

  if (
    !formData.country ||
    !formData.zip_code ||
    !formData.city ||
    !formData.street_name ||
    !formData.street_type ||
    !formData.house_number
  ) {
    responseDto.error = true;
    responseDto.message = "Kérjük minden kötelező adatot adj meg.";
  } else {
    con.query(`INSERT INTO shipping_address SET ?`, formData, (err, result) => {
      if (err) {
        responseDto.error = true;
        switch (err.code) {
          default:
            responseDto.message = "Hiba történt, kérjük próbáld újra.";
        }
      }
    });
    if (request.body.userId) {
      // TODO: update user's shipping address field
    }
  }
  response.send(responseDto);
});

// edit shipping address
app.post("/edit-shipping-address/:id", (request, response) => {
  let formData = {
    country: request.body.country,
    zip_code: request.body.zip_code,
    city: request.body.city,
    street_name: request.body.street_name,
    street_type: request.body.street_type,
    house_number: request.body.house_number,
    apartment: request.body.apartment,
    floor: request.body.floor,
    door: request.body.door,
  };

  con.query(
    "UPDATE shipping_address SET ? WHERE id = " + request.params.id,
    formData,
    (err, result) => {
      if (err) throw err;
      response.send(result);
    }
  );
});

// delete shipping address
app.delete("/delete-shipping-address/:id", (request, response) => {
  con.query(
    "DELETE FROM shipping_address WHERE id = " + request.params.id,
    (err, result) => {
      if (err) throw err;
      response.send(result);
    }
  );
});

// get shipping address
app.get("/get-shipping-address", jsonParser, (request, response) => {
  let query = `SELECT * FROM shipping_address WHERE id = '${request.query.id}'`;

  con.query(query, (err, result) => {
    if (err) throw err;

    response.send(result);
  });
});
