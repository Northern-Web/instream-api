const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');
const config   = require('./config/config.js');

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

// App Uses
app.use(express.json());
app.use(cors(corsOptions));

// Router Requirements
const authRoutes     = require("./routes/auth.routes");
const stockRoutes    = require("./routes/stock.routes");
const dividendRoutes = require("./routes/dividend.routes");
const loanRoutes     = require("./routes/loan.routes");

// Router Uses
app.use("/api/auth", authRoutes);
app.use("/api/stocks", stockRoutes);
app.use("/api/dividends", dividendRoutes);
app.use("/api/loans", loanRoutes);


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
