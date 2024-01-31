import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../Models/User";

// register handler
const register = async (req: any, res: any) => {
  try {
    const { username, email, password } = req.body;
    console.log(username, email, password,"Details",req.body);
    
    // bcrypt.hash(password, 10, async function (err: any, hashedPwd:any) {
    //   if (err) {
    //     console.log(err);
    //   }
    //   const user = new User({
    //     username,
    //     email,
    //     password: hashedPwd,
    //   });
    //   await user.save();
      res
        .status(201)
        .json({ message: "User created successfully", data: "user" });
    // });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// login handler
// const login = async (req: any, res: any) => {
//   const { email, password } = req.body;
//   try {
//     // Find the user by email
//     const user = await User.findOne({ email });

//     // Check if user exists
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Compare passwords
//     const isMatch = await bcrypt.compare(password, user.password);

//     // Check if passwords match
//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     // Generate JWT token
//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

//     // Send token in response
//     res.status(200).json({ message: "Login successful", token });
//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   }
// };

export {
  register,
  // login
};
