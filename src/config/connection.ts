import { connect, ConnectOptions, set } from 'mongoose';
import globalConstants from './constants';

set("strictQuery", false);

const options: ConnectOptions = {
    autoIndex: true,
    connectTimeoutMS: 5000,
    socketTimeoutMS: 45000
};

let db: any | undefined;

const connectToDatabase = async () => {
    try {
        db = await connect(globalConstants.DATABASE_URL, options);
        console.log('Connected to Database');
    } catch (error) {
        console.log(`Unable to connect to the database: ${error}`);
    }
};

connectToDatabase();

export default db;