require("dotenv").config();

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
// create the express app
const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://your-frontend-domain.com"],
  }),
);

app.use(express.json());

// define the connection parameter of db
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};
// create the connection to the database
const connection = mysql.createConnection(dbConfig);

// connect to the database
connection.connect((err) => {
  if (err) {
    console.log("❌ DB connection failed:", err);
  } else {
    console.log("✅ Connected to MySQL");
  }
});
//use the express.json() middleware to parse the request body
app.use(express.json());

// create get request handler to send a request
app.get("/", (req, res) => {
  res.send("testing");
});

// post request handler to add a new employe to the db
app.post("/add-employe", (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  //write the sql query to add the database table named employe_test
  const sql = `
    INSERT INTO employe_test (first_name, last_name, email, password)
    VALUES (?, ?, ?, ?)
  `;

  // execute the query

  connection.query(
    sql,
    [first_name, last_name, email, password],
    (err, result) => {
      if (err) {
        console.log("❌ Error:", err);
        return res.status(500).send("Insert failed");
      }

      console.log("✅ 1 record inserted");
      res.json({ message: "Employee added successfully" });
    },
  );
});
//post request handletr to login an employe which comes to this/login

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // ✅ validation
  if (!email || !password) {
    return res.status(400).send("Email and password are required");
  }

  // ✅ safe query (NO SQL injection)
  const sql = `
    SELECT * FROM employe_test 
    WHERE email = ? AND password = ?
  `;

  connection.query(sql, [email, password], (err, result) => {
    if (err) {
      console.log("❌ Error:", err);
      return res.status(500).send("Login failed");
    }

    // ✅ check user
    if (result.length === 0) {
      return res.status(401).send("Invalid email or password");
    }

    // ✅ success
    res.send({
      message: "Login successful",
      user: result[0],
    });
  });
});

// set up the port to listen
const port = process.env.PORT || 4000;
// set up the listener
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
