import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../Models/User";

// register handler
const registerUser = async (req: any, res: any) => {
  try {
    const existingUser = await User.findOne({
      $or: [
        { email: req.body.email },
        { phoneNumber: req.body.phoneNumber },
        { username: req.body.username },
      ],
    });

    if (existingUser) {
      return res.status(400).json({
        message:
          existingUser.email === req.body.email
            ? "User already exists"
            : existingUser.phoneNumber === req.body.phoneNumber
              ? "Phone number already used"
              : "Username already taken",
      });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      phoneNumber: req.body.phoneNumber,
    });

    await user.save();

    res.status(201).json({
      success: true,
      message: "user added successfully",
      data: user,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "user not added",
      error: error.message, // Expose only the error message for security
    });
  }
};

const loginUser = async (req: any, res: any) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    if (user && (await bcrypt.compare(password, user.password))) {
      let token = await jwt.sign(
        { user_id: user._id },
        process.env.JWT_SECRET as string,
        {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME as string,
        },
      );
      let refreshToken = await jwt.sign(
        { user_id: user._id },
        process.env.REFRESH_TOKEN_SECRET as string,
        {
          expiresIn: process.env.REFRESH_TOKEN_EXPIRE_TIME as string,
        },
      );
      res.status(200).json({
        success: true,
        message: "Login successful",
        data: {
          token,
          refreshToken,
        },
      });
    } else {
      res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export { registerUser, loginUser };
