const express = require("express");
const errorMiddleware = require("./middleware/errorMiddleware");
const app = express();
const cors = require("cors");
const DB_CONNECTION = require("./config/dbConnection");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/user");
const jobRouter = require("./routes/job");
const newsLetterSent = require("./automation/newsletter");
const applicationRouter = require("./routes/application");
require("dotenv").config({ path: "./config/config.env" });

const options = {
  origin: [
    process.env.FRONTEN_URL,
    process.env.FRONTEN_URL_2,
    'https://job-board-virid-beta.vercel.app',
  ],
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
};

//DB CONNECTION
DB_CONNECTION();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(options));
// Routes
app.use("/user/v1", userRouter);
app.use("/job/v1", jobRouter);
app.use("/application/v1", applicationRouter);
// Error Middleware
app.use(errorMiddleware);

// Email Automation
newsLetterSent();

//deployment purpose
app.get('*',(req,res,next)=>{
  res.status(200).json({
    message:'bad request'
  })
})

app.listen(process.env.PORT, () => {
  console.log(`Server listening at port ${process.env.PORT}`);
});
