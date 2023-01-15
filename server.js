const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');
const config   = require('./config/config.js');

const app = express();

/*var corsOptions = {
  //origin: "http://localhost:8081"
  origin:'*',
  credentials:true,
  optionSuccessStatus:200
};*/

// App Uses
app.use(express.json());
app.use(cors());

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
    global.gConfig.MONGODB_URI,
    {
      useNewUrlParser:    true,
      useUnifiedTopology: true
    }
  );
  console.log(`${global.gConfig.app_desc} booting in \"${global.gConfig.config_id}\" mode...`);
  console.log(`Successful connection to database \"${global.gConfig.database}\".`);
  console.log(`${global.gConfig.app_name} listening on port ${global.gConfig.node_port}`);
});
