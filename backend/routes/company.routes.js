import express from "express";
import {
  addCompany,
  fetchCompanies,
} from "../controllers/company.controller.js";

import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

/**
 * @route   POST /api/companies
 * @desc    Create company (Protected)
 */
router.post("/", protect, addCompany);

/**
 * @route   GET /api/companies
 * @desc    Get all companies (Protected)
 */
router.get("/", protect, fetchCompanies);

export default router;