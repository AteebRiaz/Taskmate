const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const taskRouter = require("./routes/task/task.controller");

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/taskstore", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log(`Couldn't connect to MongoDB, ${error}`));

app.use("/task", taskRouter);

app.listen(5000, () => console.log("App is listening at port 5000"));
