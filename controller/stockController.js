import Stock from "../models/stockSchema.js";

export const fetchStocks = async (req, res) => {
  try {
    const userId = req.user?.id; // Ensure userId is extracted properly
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: No user ID found" });
    }

    console.log("Fetching stocks for user ID:", userId);

    const stocks = await Stock.find({ userId });

    if (!stocks.length) {
      return res.status(404).json({ message: "No stocks found for this user" });
    }

    res.status(200).json(stocks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch stocks", error: error.message });
  }
};


// ✅ Add stock to user portfolio
export const addStock = async (req, res) => {
  const { symbol, quantity, boughtPrice } = req.body;

  if (!symbol || !quantity || boughtPrice == null) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  try {
    let existingStock = await Stock.findOne({ userId: req.user.id, symbol });

    if (existingStock) {
      existingStock.quantity += Number(quantity);
      existingStock.boughtPrice =
        ((existingStock.boughtPrice * existingStock.quantity) + (boughtPrice * quantity)) /
        existingStock.quantity;

      await existingStock.save();
      return res.status(200).json({ message: "Stock updated successfully", stock: existingStock });
    }

    const newStock = new Stock({
      userId: req.user.id,
      symbol: symbol.toUpperCase(),
      quantity: Number(quantity),
      boughtPrice: Number(boughtPrice),
    });

    await newStock.save();
    res.status(201).json({ message: "Stock added successfully", stock: newStock });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Fetch a stock by symbol
export const getStockBySymbol = async (req, res) => {
  try {
    const { symbol } = req.params;
    const stock = await Stock.findOne({ userId: req.user.id, symbol });

    if (!stock) {
      return res.status(404).json({ message: "Stock not found in your portfolio" });
    }

    res.status(200).json(stock);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Delete a stock
export const deleteStock = async (req, res) => {
  try {
    const { symbol } = req.params;
    const deletedStock = await Stock.findOneAndDelete({ userId: req.user.id, symbol });

    if (!deletedStock) {
      return res.status(404).json({ message: "Stock not found in your portfolio" });
    }

    res.status(200).json({ message: "Stock deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
