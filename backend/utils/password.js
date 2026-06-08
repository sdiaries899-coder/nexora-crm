import bcrypt from "bcryptjs";

/**
 * @desc Hash password
 */
export const hashPassword = async (password) => {
  if (!password) {
    throw new Error("Password is required");
  }

  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);

  return hashed;
};

/**
 * @desc Compare password
 */
export const comparePassword = async (password, hashedPassword) => {
  if (!password || !hashedPassword) {
    throw new Error("Password comparison failed");
  }

  const isMatch = await bcrypt.compare(password, hashedPassword);

  return isMatch;
};