export default function handler(req, res) {
    res.status(200).json({
        status: 'operational',
        service: 'Cyber Portfolio API',
        version: '3.0.0',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'production'
    });
}