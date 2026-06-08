import { asyncHandler } from "../middleware/async.middleware.js";
import { sendSuccess } from "../utils/response.js";
import {
  createCompanyService,
  getCompaniesService,
} from "../services/company.service.js";

/**
 * @desc Create Company
 * @route POST /api/companies
 */
export const addCompany = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    throw new Error("Company name is required");
  }

  const company = await createCompanyService({ name });

  return sendSuccess(res, "Company created successfully", company);
});

/**
 * @desc Get All Companies
 * @route GET /api/companies
 */
export const fetchCompanies = asyncHandler(async (req, res) => {
  const companies = await getCompaniesService();

  return sendSuccess(res, "Companies fetched successfully", companies);
});