const sessions = require('../data/sessions')

const authenticate = (req, res, next) => {
	const token = req.query.token || req.headers.authorization?.split(' ')[1]

	if (!token || !sessions[token]) {
		return res
			.status(403)
			.json({ success: false, data: { message: 'Access denied.' } })
	}

	req.user = sessions[token]
	next()
}

module.exports = authenticate
