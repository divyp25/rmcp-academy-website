import jwt from "jsonwebtoken";

const authenticateAdmin = (req, res, next) => {
  const accessToken = req.cookies?.accessToken; // Get access token from cookies
  if (!accessToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(accessToken, process.env.SECRET_KEY, async (err, decoded) => {
    if (!err) {
      req.adminId = decoded.id; // Attach admin ID to request
      return next();
    }

    if (err.name === "TokenExpiredError") {
      // If access token expired, check refresh token
      const refreshToken = req.cookies?.refreshToken;
      if (!refreshToken) {
        return res
          .status(403)
          .json({ message: "Session expired, please log in again" });
      }

      jwt.verify(
        refreshToken,
        process.env.REFRESH_SECRET_KEY,
        (refreshErr, decodedRefresh) => {
          if (refreshErr) {
            return res
              .status(403)
              .json({ message: "Invalid refresh token, please log in again" });
          }

          // Generate new access token
          const newAccessToken = jwt.sign(
            { id: decodedRefresh.id },
            process.env.SECRET_KEY,
            { expiresIn: "1h" }
          );

          const isProd = process.env.NODE_ENV === "production";
          res.cookie("accessToken", newAccessToken, {
            httpOnly: true,
            secure: isProd,
            sameSite: isProd ? "None" : "Lax",
          });

          req.adminId = decodedRefresh.id; // Attach admin ID to request
          next();
        }
      );
    } else {
      return res.status(403).json({ message: "Invalid token" });
    }
  });
};

export default authenticateAdmin;
