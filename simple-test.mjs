// test-email.js (ES Module version)
import nodemailer from 'nodemailer';

async function testEmail() {
    console.log('🔍 Testing email configuration...');
    
    // Test Gmail first
    console.log('\n📧 Testing Gmail...');
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'olasilvaolunleke@gmail.com',
                pass: 'asmbfielopllcxle'
            }
        });
        
        await transporter.verify();
        console.log('✅ Gmail connection successful!');
        
        const info = await transporter.sendMail({
            from: '"Test" <olasilvaolunleke@gmail.com>',
            to: 'olasilvaolunleke@gmail.com',
            subject: 'Test Email',
            text: 'If you receive this, Gmail is working!'
        });
        
        console.log('📨 Email sent! Message ID:', info.messageId);
        return true;
        
    } catch (error) {
        console.log('❌ Gmail failed:', error.message);
        
        if (error.code === 'EAUTH') {
            console.log('\n💡 Gmail App Password Tips:');
            console.log('1. Go to: https://myaccount.google.com/security');
            console.log('2. Enable 2-Step Verification');
            console.log('3. Generate App Password for "Mail"');
            console.log('4. Use 16-character password WITHOUT spaces');
        }
        
        return false;
    }
}

// Run the test
testEmail().then(success => {
    if (success) {
        console.log('\n✨ Email test passed!');
        process.exit(0);
    } else {
        console.log('\n⚠️ Email test failed.');
        process.exit(1);
    }
});