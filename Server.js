const express = require("express");
const cors = require("cors");

require("./Config/dbConnect");
const app = express();

app.use(express.json());
app.use(cors());

app.use("/todo", require("./Router/toDoRouter"));

app.listen(4000, () => console.log("Server up and running"));
