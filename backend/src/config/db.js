import mongoose from 'mongoose';

let isConnected = false;

/**
 * Connect to MongoDB Atlas using Mongoose.
 * Uses the MONGODB_URI environment variable.
 * If connection fails (e.g. Atlas IP Access List not configured yet),
 * cleanly disconnects to halt background retry loops and TLS alert spam,
 * then falls back seamlessly to the in-memory data store.
 */
export const connectDB = async () => {
  if (isConnected) {
    return mongoose.connection;
  }

  const uri = process.env.MONGODB_URI;

  if (!uri || uri.trim() === '') {
    console.log(
      '[MongoDB] MONGODB_URI is not set. Operating with in-memory data store.'
    );
    return null;
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 4000,
    });

    isConnected = true;
    console.log(`[MongoDB] Connected to MongoDB Atlas: ${conn.connection.host}`);

    // Monitor connection events only after a verified successful connection
    mongoose.connection.on('disconnected', () => {
      isConnected = false;
      console.log('[MongoDB] Connection disconnected');
    });

    mongoose.connection.on('error', (err) => {
      console.warn('[MongoDB] Connection notice:', err.message);
    });

    return conn;
  } catch (error) {
    // Crucial: Disconnect immediately to stop Mongoose background topology retries
    // which cause OpenSSL TLS alert 80 errors when Atlas firewall drops the connection.
    try {
      await mongoose.disconnect();
    } catch {
      // Ignore cleanup error
    }

    const shortMsg = error.message ? error.message.split('.')[0] : 'Connection error';
    console.warn(`[MongoDB] Notice: ${shortMsg}.`);
    console.warn(
      '[MongoDB] Action needed for Atlas: Ensure "0.0.0.0/0" is added to your MongoDB Atlas Network Access whitelist (Atlas > Network Access > Add IP Address > Allow Access from Anywhere).'
    );
    console.log('[MongoDB] Application continues running with in-memory data store.');
    return null;
  }
};

export default connectDB;
