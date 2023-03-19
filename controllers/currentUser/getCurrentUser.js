
const getCurrentUser = async (req, res) => {
// console.log(req.user)
const {email} = req.user;
res.json({
    status: "success",
    code: 200,
    data: {
        email,
    }
})
}

module.exports = getCurrentUser