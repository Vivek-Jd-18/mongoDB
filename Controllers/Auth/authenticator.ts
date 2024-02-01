import jwt from "jsonwebtoken";

const authGuard = async (req: any, res: any, next: any) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decode = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decode;
    next();
  } catch (error: any) {
    if (error?.name === "TokenExpiredError") {
      res.status(401).send({ message: "Token Expired" });
      return;
    }
    res.status(401).send({ message: "Authentication failed!" });
  }
};

const refreshToken = async (req: any, res: any) => {
  try {
    const _refershToken = req.body.refreshToken;
    const verify: any = jwt.verify(
      _refershToken,
      process.env.JWT_SECRET as string,
    );
    console.log(verify, "Verify", typeof verify);
    if (verify) {
      let token = jwt.sign(
        { user_id: verify._id },
        process.env.JWT_SECRET as string,
        {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME as string,
        },
      );
      res.status(200).json({
        status: true,
        token,
        _refershToken,
      });
    } else {
      res.status(401).json({
        status: false,
        message: "invalid token",
      });
    }
  } catch (error: any) {
    res.status(400).json({
      status: false,
      message: error,
    });
  }
};

export { authGuard, refreshToken };
