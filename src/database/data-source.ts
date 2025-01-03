


import mongoose from 'mongoose';
import envConfig from 'src/config/config';




const MONGO_URI = envConfig.mongo.uri

class MongoDBConnect {
    constructor() {
        this.connect();
    }

    connect(type = 'mongodb') {
        if (envConfig.node_env === 'development') {
            mongoose.set('debug', true);
            mongoose.set('debug', { color: true });
            // checkOverload()
        }
        mongoose
        .connect(MONGO_URI, {
            maxPoolSize: 100,
        })
        .then(() => { })
        .catch((err) => console.log('Error connecting database: ' + err));
        
        mongoose.connection.on('connected', () => {
            console.info('Connected to MongoDB!');
        });

        mongoose.connection.on('reconnected', () => {
            console.info('MongoDB reconnected!');
        });

        mongoose.connection.on('error', (error) => {
            console.error(`Error in MongoDb connection: ${error}`);
            mongoose.disconnect();
        });

        mongoose.connection.on('disconnected', () => {
            console.error(
                `MongoDB disconnected! Reconnecting in ${10000 / 1000}s...`
            );
            setTimeout(() => this.connect(), 10000);
        });
    }

    static instance;
    static getInstance() {
        if (!MongoDBConnect.instance) {
            MongoDBConnect.instance = new MongoDBConnect();
        }
        return MongoDBConnect.instance;
    }
}

const instanceMongoDb = MongoDBConnect.getInstance();
export default instanceMongoDb;