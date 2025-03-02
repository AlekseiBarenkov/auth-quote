const express = require('express')
const authenticate = require('../middleware/authMiddleware')

const router = express.Router()

router.get('/profile', authenticate, (req, res) => {
	res.json({
		success: true,
		data: { fullname: req.user.fullname, email: req.user.email },
	})
})

module.exports = router
