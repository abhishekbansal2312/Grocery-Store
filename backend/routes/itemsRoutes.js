import express from "express";
import {
  getItemsController,
  postItemsController,
  putItemsController,
  deleteItemsController,
} from "../controller/itemsController.js"; // Use ES module imports

const router = express.Router();

router.get("/", getItemsController);
router.post("/", postItemsController);
router.put("/:id", putItemsController);
router.delete("/:id", deleteItemsController);

export default router;
