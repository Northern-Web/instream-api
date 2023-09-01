const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');
require('dotenv').config();

const app = express();

var corsOptions = {
  origin: '*',
  methods: [
    'GET',
    'POST',
    'PATCH',
    'DELETE'
  ],
  allowedHeaders: [
    'Content-Type',
  ]
};

// App Uses
app.use(express.json());
app.use(cors(corsOptions));

// Router Requirements
const authRoutes           = require("./routes/auth.routes");
const stockRoutes          = require("./routes/stock.routes");
const dividendRoutes       = require("./routes/dividend.routes");
const loanRoutes           = require("./routes/loan.routes");
const loanPaymentRoutes    = require("./routes/loanPayment.routes");
const userRoutes           = require("./routes/user.routes");
const portfolioValueRoutes = require("./routes/portfolioValue.routes");

// Router Uses
app.use("/api/auth", authRoutes);
app.use("/api/stocks", stockRoutes);
app.use("/api/dividends", dividendRoutes);
app.use("/api/loans", loanRoutes);
app.use("/api/loanPayments", loanPaymentRoutes);
app.use("/api/users", userRoutes);
app.use("/api/portfolioValues", portfolioValueRoutes);


app.listen(process.env.PORT || 3000, () => {
  mongoose.connect(
    process.env.DB_URI,
    {
      useNewUrlParser:    true,
      useUnifiedTopology: true
    }
  );
  console.log(`InStream API booting in \"${process.env.MODE}\" mode...`);
  console.log(`Successful connection to database \"${process.env.DB_NAME}\".`);
  console.log(`InStream API listening on port ${process.env.PORT}`);
});
