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
	sessions.set(token, user)

	res.cookie('token', token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'strict',
	})

	return res.json({ success: true })
})

router.delete('/logout', (req, res) => {
	const token = req.cookies.token

	if (!token || !sessions.get(token)) {
		return res
			.status(400)
			.json({ success: false, data: { message: 'Invalid token.' } })
	}

	sessions.remove(token)
	res.clearCookie('token')

	return res.json({ success: true })
})

module.exports = router
