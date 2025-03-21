import express from "express";
import { addStock, getStockBySymbol, deleteStock , fetchStocks} from "../controller/stockController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// ✅ Ensure authentication is applied before accessing these routes
router.get("/all", isAuthenticated , fetchStocks);
router.post("/add", isAuthenticated, addStock);
router.get("/:symbol", isAuthenticated, getStockBySymbol);  // ✅ Corrected function name
router.delete("/delete/:symbol", isAuthenticated, deleteStock);

export default router;
