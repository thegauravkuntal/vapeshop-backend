require('dns').setServers(['8.8.8.8', '8.8.4.4']);
require('dotenv').config();
const mongoose = require('mongoose');

async function test() {
  try {
    console.log('Testing MongoDB connection...');
    console.log('URI:', process.env.MONGODB_URI ? 'Set (hidden)' : 'NOT SET');

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 15000,
      connectTimeoutMS: 15000,
      family: 4,
    });

    console.log(`Connected to: ${conn.connection.host}`);
    console.log(`Database: ${conn.connection.name}`);

    await conn.connection.db.command({ ping: 1 });
    console.log('Ping successful!');

    await mongoose.disconnect();
    console.log('Disconnected. Connection works!');
    process.exit(0);
  } catch (e) {
    console.error('Connection FAILED:', e.message);
    if (e.message.includes('IP that is not in the allowlist')) {
      console.error('\n>>> FIX: Go to MongoDB Atlas → Network Access → Add your IP address <<<');
    }
    if (e.message.includes('SSL') || e.message.includes('TLS') || e.message.includes('alert')) {
      console.error('\n>>> TLS/SSL error — check if your IP is whitelisted in MongoDB Atlas <<<');
    }
    process.exit(1);
  }
}

test();
setTimeout(() => { console.log('TIMEOUT after 20s'); process.exit(1); }, 20000);
