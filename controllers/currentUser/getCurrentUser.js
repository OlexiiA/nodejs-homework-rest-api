const getCurrentUser = async (req, res) => {
  const { email } = req.user;
  res.json({
    status: "success",
    code: 200,
    data: {
      email,
    },
  });
};

module.exports = getCurrentUser;
