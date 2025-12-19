import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ 
            success: false, 
            error: 'Method not allowed' 
        });
    }

    try {
        const { name, email, phone, subject, message } = req.body;
        
        // Validate required fields
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                error: 'Name, email, and message are required'
            });
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid email format'
            });
        }
        
        // Sanitize inputs
        const sanitize = (input) => {
            if (typeof input !== 'string') return input;
            return input.trim().replace(/[<>]/g, '').substring(0, 1000);
        };
        
        const contactData = {
            name: sanitize(name),
            email: sanitize(email),
            phone: sanitize(phone) || 'Not provided',
            subject: sanitize(subject) || 'Portfolio Inquiry',
            message: sanitize(message)
        };
        
        console.log('📧 Contact submission:', contactData);
        
        // Check if email credentials are configured
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.log('⚠️ Email not configured on Vercel');
            return res.json({
                success: true,
                message: 'Message received! (Email simulation mode)',
                data: {
                    id: `MSG-${Date.now()}`,
                    name: contactData.name,
                    email: contactData.email,
                    timestamp: new Date().toISOString()
                }
            });
        }
        
        // Configure email transporter for Vercel
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
        
        // Email to admin (you)
        const adminEmail = {
            from: process.env.EMAIL_USER,
            to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
            subject: `🚀 New Portfolio Contact: ${contactData.name}`,
            html: `
                <div style="font-family: 'Courier New', monospace; background: #0a0a0a; color: #00ff41; padding: 20px;">
                    <div style="max-width: 600px; margin: 0 auto; background: #111; border-radius: 10px; padding: 30px; border: 1px solid #00f3ff;">
                        <h2 style="color: #00f3ff; text-align: center;">📡 NEW CONTACT SUBMISSION</h2>
                        <div style="margin: 20px 0; padding: 15px; background: #1a1a1a; border-radius: 5px;">
                            <p><strong>Name:</strong> ${contactData.name}</p>
                            <p><strong>Email:</strong> ${contactData.email}</p>
                            <p><strong>Phone:</strong> ${contactData.phone}</p>
                            <p><strong>Subject:</strong> ${contactData.subject}</p>
                        </div>
                        <div style="background: #222; padding: 15px; border-radius: 5px;">
                            <p><strong>Message:</strong></p>
                            <p>${contactData.message}</p>
                        </div>
                        <p style="text-align: center; margin-top: 20px; color: #666;">
                            Received from your portfolio at ${new Date().toLocaleString()}
                        </p>
                    </div>
                </div>
            `
        };
        
        // Confirmation email to user
        const userEmail = {
            from: process.env.EMAIL_USER,
            to: contactData.email,
            subject: '✅ Message Received - Silva Ola Portfolio',
            html: `
                <div style="font-family: 'Courier New', monospace; background: #0a0a0a; color: #fff; padding: 20px;">
                    <div style="max-width: 600px; margin: 0 auto; background: #111; border-radius: 10px; padding: 30px; border: 1px solid #00ff41;">
                        <h2 style="color: #00ff41; text-align: center;">✅ MESSAGE RECEIVED</h2>
                        <p style="text-align: center; color: #aaa;">Thank you for contacting Silva Ola!</p>
                        
                        <div style="margin: 20px 0; padding: 15px; background: #1a1a1a; border-radius: 5px;">
                            <p><strong>Message ID:</strong> MSG-${Date.now()}</p>
                            <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
                        </div>
                        
                        <p>Hi ${contactData.name},</p>
                        <p>Your message has been received successfully. I'll review it and get back to you as soon as possible.</p>
                        
                        <div style="text-align: center; margin: 25px 0;">
                            <a href="${process.env.VERCEL_URL || 'https://your-portfolio.vercel.app'}" 
                               style="background: linear-gradient(45deg, #00f3ff, #00ff9d); color: #000; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                                VISIT PORTFOLIO
                            </a>
                        </div>
                        
                        <p style="text-align: center; color: #666; font-size: 12px; margin-top: 30px;">
                            This is an automated confirmation email. Please do not reply.
                        </p>
                    </div>
                </div>
            `
        };
        
        // Send emails
        await Promise.all([
            transporter.sendMail(adminEmail),
            transporter.sendMail(userEmail)
        ]);
        
        console.log('✅ Emails sent successfully');
        
        return res.status(200).json({
            success: true,
            message: 'Message sent successfully! Check your email for confirmation.',
            data: {
                id: `MSG-${Date.now()}`,
                name: contactData.name,
                email: contactData.email,
                timestamp: new Date().toISOString()
            }
        });
        
    } catch (error) {
        console.error('❌ Contact form error:', error);
        
        return res.status(500).json({
            success: false,
            error: 'Failed to send message. Please try again later.',
            debug: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}