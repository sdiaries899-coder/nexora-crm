import prisma from "../config/db.js";

/**
 * @desc Create Company
 */
export const createCompanyService = async ({ name }) => {
  if (!name) {
    throw new Error("Company name is required");
  }

  // Optional: prevent duplicate company names
  const exists = await prisma.company.findFirst({
    where: { name },
  });

  if (exists) {
    throw new Error("Company already exists");
  }

  const company = await prisma.company.create({
    data: { name },
  });

  return company;
};

/**
 * @desc Get All Companies
 */
export const getCompaniesService = async () => {
  const companies = await prisma.company.findMany({
    orderBy: { createdAt: "desc" },
  });

  return companies;
};