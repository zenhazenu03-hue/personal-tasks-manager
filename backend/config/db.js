const mongoose = require('mongoose');
const dns = require('dns');

// Use Google DNS to resolve MongoDB Atlas SRV records.
// Required because some local resolvers (e.g. VPN clients) block SRV queries.
dns.setServers(['8.8.8.8', '8.8.4.4']);

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error('[DB] MONGODB_URI is not defined in environment variables.');
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(uri, { family: 4 });
    console.log(`[DB] Connected → ${conn.connection.host}`);
  } catch (err) {
    console.error(`[DB] Connection failed: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
