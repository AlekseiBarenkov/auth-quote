const express = require('express');
const authenticate = require('../middleware/authMiddleware');
const authors = require('../data/authors');
const quotes = require('../data/quotes');

const router = express.Router();

router.get('/author', authenticate, (_, res) => {
	setTimeout(() => {
		const randomAuthor = authors[Math.floor(Math.random() * authors.length)];

		if (!randomAuthor) {
			return res.json({ success: false, data: { message: 'No authors found.' } });
		}
		res.json({ success: true, data: randomAuthor });
	}, 5000);
});

router.get('/quote', authenticate, (req, res) => {
	const authorId = Number(req.query.authorId);
	const authorQuotes = quotes.filter((q) => q.authorId === authorId);

	if (authorQuotes.length === 0) {
		return res.json({ success: false, data: { message: 'No quotes found.' } });
	}

	setTimeout(() => {
		const randomQuote = authorQuotes[Math.floor(Math.random() * authorQuotes.length)];
		res.json({ success: true, data: randomQuote });
	}, 5000);
});

module.exports = router;
