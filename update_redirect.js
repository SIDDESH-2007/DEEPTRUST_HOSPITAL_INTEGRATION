import 'dotenv/config';
import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/deeptrust').then(async () => {
    try {
        const db = mongoose.connection.db;
        const result = await db.collection('integrations').updateOne(
            { client_id: process.env.DEEPTRUST_CLIENT_ID || 'client_demo_healthcare_app_001' },
            {
                $addToSet: {
                    allowed_origins: { $each: ['http://localhost:5176', 'http://127.0.0.1:5176'] },
                    allowed_redirects: { $each: ['http://localhost:5176', 'http://127.0.0.1:5176'] }
                }
            }
        );
        console.log('Update result:', result);
    } catch (e) {
        console.error('Error:', e);
    } finally {
        process.exit(0);
    }
});
