import mongoose from 'mongoose';

export async function connectDB() {
    try {
        // Connect to the MongoDB
        await mongoose.connect(process.env.MONGO_URI!);

        const connection = mongoose.connection;

        // Increase the maximum number of listeners
        connection.setMaxListeners(20);

        connection.on('connected', () => {
            console.log('MongoDB connected successfully');
        });

        connection.on('error', (err) => {
            console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
            process.exit(1);
        });

    } catch (error) {
        console.log('Something goes wrong!');
        console.log(error);
        process.exit(1);
    }
}
