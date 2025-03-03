const fs = require('fs')
const path = require('path')

const sessionsFile = path.join(__dirname, 'sessions.json')

const loadSessions = () => {
	try {
		const data = fs.readFileSync(sessionsFile, 'utf-8')
		return JSON.parse(data)
	} catch (error) {
		return {}
	}
}

const saveSessions = sessions => {
	fs.writeFileSync(sessionsFile, JSON.stringify(sessions, null, 2), 'utf-8')
}

let sessions = loadSessions()

module.exports = {
	get: token => sessions[token],
	set: (token, user) => {
		sessions[token] = user
		saveSessions(sessions)
	},
	remove: token => {
		delete sessions[token]
		saveSessions(sessions)
	},
}
