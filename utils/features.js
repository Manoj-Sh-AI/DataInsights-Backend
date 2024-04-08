import jwt from "jsonwebtoken";

export const sendCookie = async (user, res, message, statusCode = 200) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  return res
    .status(statusCode)
    .cookie("token", token, {
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "none",
      secure: true,
    })
    .json({
      success: true,
      message,
    });
};
