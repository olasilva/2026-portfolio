// api/contact.js
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ 
            success: false, 
            message: 'Method not allowed' 
        });
    }

    try {
        const { name, email, subject, message } = req.body;
        
        console.log('📩 Contact form submission received:', { name, email });
        
        // Validate required fields
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: 'Name, email, and message are required'
            });
        }
        
        // Check if we have Mailtrap credentials
        if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.log('⚠️ Mailtrap not configured - logging contact only');
            console.log('Contact details:', { name, email, subject, message });
            
            return res.json({
                success: true,
                message: 'Message received! (Email service not configured)',
                data: {
                    id: `MSG-${Date.now()}`,
                    name,
                    email,
                    timestamp: new Date().toISOString()
                }
            });
        }
        
        // Create transporter with Mailtrap
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT || 2525,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
        
        // Verify connection first
        await transporter.verify();
        console.log('✅ Mailtrap connection verified');
        
        // Email to admin (you)
        const adminMail = {
            from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
            to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
            replyTo: email,
            subject: `📬 New Message: ${name} - ${subject || 'Portfolio Inquiry'}`,
            html: `
                <div style="font-family: 'Courier New', monospace; background: #0a0a0a; color: #fff; padding: 20px;">
                    <div style="max-width: 600px; margin: 0 auto; background: #111; padding: 30px; border-radius: 10px; border: 2px solid #00f3ff;">
                        <h2 style="color: #00f3ff; text-align: center; border-bottom: 1px solid #00f3ff; padding-bottom: 10px;">
                            📡 NEW PORTFOLIO CONTACT
                        </h2>
                        
                        <div style="margin: 20px 0; padding: 15px; background: #1a1a1a; border-radius: 5px;">
                            <p><strong>👤 Name:</strong> ${name}</p>
                            <p><strong>📧 Email:</strong> ${email}</p>
                            <p><strong>📋 Subject:</strong> ${subject || 'No subject'}</p>
                            <p><strong>🕐 Time:</strong> ${new Date().toLocaleString()}</p>
                        </div>
                        
                        <div style="background: #222; padding: 15px; border-radius: 5px; margin: 20px 0;">
                            <p><strong>💬 Message:</strong></p>
                            <p style="white-space: pre-line; line-height: 1.6;">${message}</p>
                        </div>
                        
                        <div style="text-align: center; margin-top: 20px; color: #666; font-size: 12px;">
                            <p>📨 Sent via Silva Portfolio Contact Form</p>
                            <p>🔗 ${process.env.BASE_URL || 'http://localhost:3000'}</p>
                        </div>
                    </div>
                </div>
            `,
            text: `
NEW CONTACT FORM SUBMISSION
===========================
Name: ${name}
Email: ${email}
Subject: ${subject || 'No subject'}
Time: ${new Date().toLocaleString()}

Message:
${message}

---
Sent via Silva Portfolio Contact Form
            `
        };
        
        // Send email
        const info = await transporter.sendMail(adminMail);
        console.log('✅ Email sent to Mailtrap:', info.messageId);
        
        // Success response
        return res.status(200).json({
            success: true,
            message: 'Message sent successfully! I\'ll get back to you soon.',
            data: {
                id: info.messageId,
                name,
                email,
                timestamp: new Date().toISOString()
            }
        });
        
    } catch (error) {
        console.error('❌ Email error:', error);
        
        // Log contact anyway for debugging
        console.log('📝 Contact details (failed to send):', req.body);
        
        return res.status(500).json({
            success: false,
            message: 'Failed to send message. Please try again later.',
            debug: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}