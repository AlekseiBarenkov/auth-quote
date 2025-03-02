const express = require('express')
const crypto = require('crypto')
const users = require('../data/users')
const sessions = require('../data/sessions')

const router = express.Router()

router.post('/login', (req, res) => {
	const { email, password } = req.body
	const user = users.find(
		userItem => userItem.email === email && userItem.password === password
	)

	if (!user) {
		return res
			.status(401)
			.json({ success: false, data: { message: 'Access denied.' } })
	}

	const token = crypto.randomBytes(20).toString('hex')
	sessions[token] = user

	return res.json({ success: true, data: { token } })
})

router.delete('/logout', (req, res) => {
	const token = req.query.token
	if (token) delete sessions[token]
	res.json({ success: true, data: {} })
})

module.exports = router
