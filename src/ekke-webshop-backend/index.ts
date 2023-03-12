import express from "express";
import mysql from "mysql";
import cors from "cors";
import bodyParser from 'body-parser';

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
app.get('/allusers', (req, res) => {

  let query = "SELECT * FROM `user`";

  con.query(query, (err, result) => {
    if (err) throw err;
    res.send(result)
  });
})

// add user
app.post('/adduser', (req, res) => {

  let query = `INSERT INTO user SET ?`;

  let formData = {
    username: req.body.username,
    neptun: req.body.neptun,
    email: req.body.email,
    password: req.body.password,
    permission: 0
  }

  con.query(query, formData, (err, res) => {
    if (err) throw err;
    // res.redirect('/user');
  });
})

// edit user
app.post('/edituser/:id', (req, res) => {

  let formData = {
    username: req.body.username,
    neptun: req.body.neptun,
    email: req.body.email,
    password: req.body.password,
    permission: 0
  }

  con.query('UPDATE user SET ? WHERE id = ' + req.params.id, formData, (err, res) => {
    if (err) throw err
    // res.redirect('/user');
  })
})

// delete user
app.get('/deleteuser/(:id)', (req, res) => {

  con.query('DELETE FROM user WHERE id = ' + req.params.id, (err, res) => {
    if (err) throw err
    console.log("deleted user");
    // res.redirect('/user')
  })
})

// login
app.post('/login', jsonParser, (req, resp) => {

  con.query(`SELECT password FROM user WHERE email = '${req.body.email}'`, (err, res)=> {
    if (err) throw err;
    if (res[0].password === req.body.password) {
      resp.send(true)
    }
    else {
      resp.send(false)
    }
  })
})