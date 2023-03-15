import express from "express";
import mysql from "mysql";
import cors from "cors";
import bodyParser from 'body-parser';
import sha1 from 'sha1';

const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
}

const app = express()
const port = 4201
const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(cors(corsOptions))

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
  console.log(`Example app listening on port ${port}`)
})

// get all users
app.get('/allusers', (request, response) => {

  let query = "SELECT * FROM `user`";

  con.query(query, (err, result) => {
    if (err) throw err;
    response.send(result)
  });
})

// add user
app.post('/adduser', jsonParser, (request, response) => {

  let query = `INSERT INTO user SET ?`;

  let formData = {
    name: request.body.name,
    neptun: request.body.neptun,
    email: request.body.email,
    password: sha1(request.body.password),
    permission: 0
  }

  if (!formData.name || !formData.neptun || !formData.email || !request.body.password) {
    response.send(false);
  }
  else {
    con.query(query, formData, (err, result) => {
      if (err) throw err;
      response.send(true);
    });
  }
})

// edit user
app.post('/edituser/:id', (request, response) => {

  let formData = {
    name: request.body.name,
    neptun: request.body.neptun,
    email: request.body.email,
    password: request.body.password,
    permission: 0
  }

  con.query('UPDATE user SET ? WHERE id = ' + request.params.id, formData, (err, result) => {
    if (err) throw err
    // response.redirect('/user');
  })
})

// delete user
app.get('/deleteuser/(:id)', (request, response) => {

  con.query('DELETE FROM user WHERE id = ' + request.params.id, (err, result) => {
    if (err) throw err
    console.log("deleted user");
    // response.redirect('/user')
  })
})

// login
app.post('/login', jsonParser, (request, response) => {

  con.query(`SELECT password FROM user WHERE email = '${request.body.email}'`, (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      if (result[0].password === sha1(request.body.password)) {
        response.send(
          {
            authenticated: true,
            errorMessage: null
          }
        );
      }
      else {
        response.send(
          {
            authenticated: false,
            errorMessage: 'Helytelen email vagy jelszó!'
          }
        );
      }
    }
    else {
      response.send(
        {
          authenticated: false,
          errorMessage: 'Helytelen email vagy jelszó!'
        }
      );
    }
  })
})

app.get('/shatest', jsonParser, (request, response) => {
  response.send(sha1("banana"));
})