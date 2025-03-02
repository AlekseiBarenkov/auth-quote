const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.get('/', (_, res) => {
	res.json({ success: true, message: 'API is running!' })
})

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`)
})
