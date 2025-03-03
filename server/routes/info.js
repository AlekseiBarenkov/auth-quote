const express = require('express')

const router = express.Router()

router.get('/', (_, res) => {
	res.json({
		success: true,
		data: { info: 'Some information about the <b>company</b>.' },
	})
})

module.exports = router
