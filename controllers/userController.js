const { registerUserService, loginUserService } = require("../services/userService");

// REGISTER CONTROLLER
const registerUser = async (req, res) => {
  try {
    const newUser = await registerUserService(req.body);

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
        username: newUser.username,
        role: newUser.role,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// LOGIN CONTROLLER
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await loginUserService(email, password);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser };
