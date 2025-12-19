const express = require('express');
const app = express();
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth.routes');
const movieRoutes = require('./routes/movie.routes')
const cookieParser = require('cookie-parser'); 
const cors = require('cors');    

const PORT = process.env.PORT || 5000;

dotenv.config();
connectDB();

app.use(cookieParser());

app.use(cors({
  origin: process.env.CLIENT_URL , 
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRoutes);
app.use('/movies', movieRoutes);

app.get('/',(req, res) => {
    res.send('Hello from the backend!');
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});