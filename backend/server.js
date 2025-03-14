import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import expenseRoutes from './routes/expenseRoutes.js';

dotenv.config();
connectDB();
const allowedOrigins = [
    "https://erino-assignment-zeta.vercel.app",
    "https://erino-assignment-git-main-prateek-fsts-projects.vercel.app",
    "https://erino-assignment-hpl60p81j-prateek-fsts-projects.vercel.app"
  ];
const app = express();
app.use(cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true
  }));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
