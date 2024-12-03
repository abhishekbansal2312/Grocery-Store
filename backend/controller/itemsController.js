import Item from "../models/items.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const getUserIdFromToken = (req) => {
  const token = req.cookies?.xoxo;
  if (!token) {
    throw new Error("Unauthorized: No token provided");
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    return decoded.id;
  } catch (err) {
    throw new Error("Unauthorized: Invalid token");
  }
};

export const getItemsController = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);

    const items = await Item.find({ user: userId }).populate(
      "user",
      "name email"
    );

    if (!items || items.length === 0) {
      return res.status(404).json({ message: "No items found for the user" });
    }

    res.status(200).json({
      message: "Fetched items successfully",
      items,
    });
  } catch (error) {
    const statusCode = error.message.includes("Unauthorized") ? 401 : 500;
    console.error("Error fetching items:", error.message);
    res.status(statusCode).json({
      message: error.message || "Failed to fetch items",
      error: error.message,
    });
  }
};

export const postItemsController = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);

    const { name, amount, description, quantity, category, isActive } =
      req.body;

    if (!name || !amount || quantity === undefined) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newItem = new Item({
      name,
      amount,
      description,
      quantity,
      category,
      isActive,
      user: userId,
    });

    const savedItem = await newItem.save();

    const populatedItem = await Item.findById(savedItem._id).populate(
      "user",
      "name email"
    );

    res.status(201).json({
      message: "Item created successfully",
      item: populatedItem,
    });
  } catch (error) {
    console.error("Error creating item:", error);
    const statusCode = error.message.includes("Unauthorized") ? 401 : 500;
    res.status(statusCode).json({
      message: error.message || "Failed to create item",
      error: error.message,
    });
  }
};

export const putItemsController = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req); // Extract user ID from token

    const itemId = req.params.id; // Get item ID from URL parameters
    const { name, amount, description, quantity, category, isActive } =
      req.body; // Extract fields from request body

    // Validate the item ID
    if (!mongoose.isValidObjectId(itemId)) {
      return res.status(400).json({ message: "Invalid item ID" });
    }

    // Check if the item exists and belongs to the current user
    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    if (item.user.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this item" });
    }

    const updates = {};
    if (name !== undefined) updates.name = name;
    if (amount !== undefined) updates.amount = amount;
    if (description !== undefined) updates.description = description;
    if (quantity !== undefined) updates.quantity = quantity;
    if (category !== undefined) updates.category = category;
    if (isActive !== undefined) updates.isActive = isActive;

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "No fields provided for update" });
    }

    const updatedItem = await Item.findByIdAndUpdate(itemId, updates, {
      new: true,
      runValidators: true,
    }).populate("user", "name email");

    res.status(200).json({
      message: "Item updated successfully",
      item: updatedItem,
    });
  } catch (error) {
    console.error("Error updating item:", error.message);
    res.status(500).json({
      message: "Failed to update item",
      error: error.message,
    });
  }
};

export const deleteItemsController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid item ID" });
    }

    const deletedItem = await Item.findByIdAndDelete(id).populate(
      "user",
      "name email"
    );

    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({
      message: "Item deleted successfully",
      item: deletedItem,
    });
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({
      message: "Failed to delete item",
      error: error.message,
    });
  }
};
