import dotenv from 'dotenv';
import globalConsts from '../interfaces/globalConst.interface';

dotenv.config();

const globalConstants: globalConsts = {
    BASE_URL: process.env.BASE_URL || '',
    PORT: parseInt(process.env.PORT || '3000', 10),
    DATABASE_URL: process.env.DATABASE_URL || '',
    JWT_SECRET: process.env.JWT_SECRET || '',
    DRIVE_FOLDER_ID: process.env.DRIVE_FOLDER_ID || ''
}

export default globalConstants;