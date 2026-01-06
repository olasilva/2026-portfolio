// test-mailtrap-working.mjs
import nodemailer from 'nodemailer';

// PUT YOUR ACTUAL MAILTRAP CREDENTIALS HERE
const MAILTRAP_CREDS = {
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
        user: '7592e3149c47eb',
        pass: 'bd9aabb00767da'       
    }
};

console.log('📧 Testing Mailtrap Connection\n');
console.log('Host:', MAILTRAP_CREDS.host);
console.log('Port:', MAILTRAP_CREDS.port);
console.log('Username length:', MAILTRAP_CREDS.auth.user?.length || 'Not set');
console.log('Password length:', MAILTRAP_CREDS.auth.pass?.length || 'Not set');

if (!MAILTRAP_CREDS.auth.user || MAILTRAP_CREDS.auth.user === 'YOUR_USERNAME') {
    console.log('\n⚠️ Please update with real Mailtrap credentials:');
    console.log('1. Go to https://mailtrap.io');
    console.log('2. Sign in and go to "Email Testing" → "My Inbox"');
    console.log('3. Click "Show Credentials"');
    console.log('4. Copy the username and password');
    console.log('5. Update this file with real credentials\n');
    process.exit(1);
}

async function testMailtrap() {
    try {
        // Create transporter
        const transporter = nodemailer.createTransport(MAILTRAP_CREDS);
        
        // Test connection
        console.log('🔄 Testing connection to Mailtrap...');
        await transporter.verify();
        console.log('✅ Connection successful!');
        
        // Send test email
        console.log('\n📤 Sending test email to Mailtrap inbox...');
        const info = await transporter.sendMail({
            from: '"Silva Portfolio" <portfolio@example.com>',
            to: 'test@example.com',  // Goes to Mailtrap inbox, not real email
            subject: '✅ Portfolio Email Test - SUCCESS',
            text: 'Mailtrap is working! Your portfolio contact form will work.',
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px;">
                    <h2 style="color: green;">✅ Mailtrap Test Successful!</h2>
                    <p>Your portfolio email system is now configured.</p>
                    <p><strong>Test Time:</strong> ${new Date().toLocaleString()}</p>
                    <p>When someone submits your contact form, emails will appear here in Mailtrap.</p>
                </div>
            `
        });
        
        console.log('\n🎉 SUCCESS!');
        console.log('📨 Message ID:', info.messageId);
        console.log('\n📋 Next steps:');
        console.log('1. Check your Mailtrap inbox: https://mailtrap.io/inboxes');
        console.log('2. You should see the test email there');
        console.log('3. Update your .env file with these credentials');
        console.log('4. Test your portfolio contact form\n');
        
        console.log('📝 For your .env file:');
        console.log(`EMAIL_HOST=${MAILTRAP_CREDS.host}`);
        console.log(`EMAIL_PORT=${MAILTRAP_CREDS.port}`);
        console.log(`EMAIL_USER=${MAILTRAP_CREDS.auth.user}`);
        console.log(`EMAIL_PASS=${MAILTRAP_CREDS.auth.pass}`);
        
    } catch (error) {
        console.error('\n❌ Error:', error.message);
        console.log('\n🔧 Troubleshooting:');
        console.log('1. Check if credentials are correct');
        console.log('2. Try port 587 instead of 2525');
        console.log('3. Make sure you copied the entire username/password');
        console.log('4. Check Mailtrap dashboard for correct credentials');
    }
}

testMailtrap();