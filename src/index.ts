// ==================== Database Connection ====================
import './config/connection';

// ==================== Dependendies ====================
import express, { Request, Response, NextFunction, Express } from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';
import createError from 'http-errors';
import cors from 'cors';

// ==================== Global Constants ====================
import globalConstants from './config/constants';

// ==================== Sockets for 2 way communication ====================
import notificationSocket from './sockets/notification.socket';

// ==================== Routes Files ====================
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import profileRoutes from './routes/profile.routes';

// ==================== Required Configuration ====================
const app: Express = express();
const server: any = createServer(app);
const io: any = new Server(server, {cors: {origin: "http://localhost:3000"}});

// ==================== Sockets for 2 way communication ====================
notificationSocket(io);

// ==================== Built-in Middlewares ====================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// ==================== Routes Configuration ====================
app.use(globalConstants.BASE_URL+'/auth', authRoutes);
app.use(globalConstants.BASE_URL+'/users', userRoutes);
app.use(globalConstants.BASE_URL+'/profile', profileRoutes);

// ==================== Error Creation ====================
app.use((request: Request, response: Response, next: NextFunction) => next(createError(404)));
app.use(({status, message}: any, request: Request, response: Response, next: NextFunction) => response.status(status || 500).json({status, message}));

// ==================== Port Listening ====================
server.listen(globalConstants.PORT, () => console.log(`Server running on port ${globalConstants.PORT}`));