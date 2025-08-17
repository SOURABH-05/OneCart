import jwt from "jsonwebtoken";

export const generateToken = async (userId) => {
  let token = await jwt.sign(
    { id: userId },
    process.env.JWT_SECRET || "mysecretkey", // Secret key
    { expiresIn: "7d" } // Token validity
  );
  return token
};


export const generateToken1 = async (email) => {
  let token = await jwt.sign(
    {email},
    process.env.JWT_SECRET || "mysecretkey", // Secret key
    { expiresIn: "1d" } // Token validity
  );
  return token
};

