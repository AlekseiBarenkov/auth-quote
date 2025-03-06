const express = require('express');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

const envFile = process.env.NODE_ENV === 'development' ? '.env.development' : '.env';
dotenv.config({ path: path.resolve(__dirname, envFile) });

const corsOptions = {
	origin: [process.env.CLIENT_URL],
	credentials: true
};

const infoRoutes = require('./routes/info');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const quoteRoutes = require('./routes/quotes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use('/info', infoRoutes);
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/quotes', quoteRoutes);

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
