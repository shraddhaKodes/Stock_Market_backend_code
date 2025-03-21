import mongoose from "mongoose";

const stockSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true }, 
  symbol: { type: String, required: true }, // Stock ticker symbol (e.g., AAPL, TSLA)
  name: { type: String, required: true }, // Full company name
  price: { type: Number, required: true }, // Current stock price
  quantity: { type: Number, required: true, default: 1 }, // Number of shares owned
  boughtPrice: { type: Number, required: true }, // Purchase price per share
  open: { type: Number }, // Opening price
  high: { type: Number }, // Highest price of the day
  low: { type: Number }, // Lowest price of the day
  previousClose: { type: Number }, // Previous day's closing price
  volume: { type: Number }, // Trading volume
  date: { type: Date, default: Date.now }, // Date of entry
});

const Stock = mongoose.model("Stock", stockSchema);

export default Stock;
