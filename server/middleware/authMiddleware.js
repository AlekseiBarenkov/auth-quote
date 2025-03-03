const sessions = require('../data/sessions')

const authenticate = (req, res, next) => {
	const token = req.cookies.token
	const user = token ? sessions.get(token) : null

	if (!user) {
		return res
			.status(403)
			.json({ success: false, data: { message: 'Access denied.' } })
	}

	req.user = user
	next()
}

module.exports = authenticate
