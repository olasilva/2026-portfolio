// setup-mailtrap.mjs
console.log(`
🚀 PORTFOLIO EMAIL SETUP GUIDE
==============================

Since Gmail is giving connection issues, let's use Mailtrap:

STEP 1: GET MAILTRAP CREDENTIALS
--------------------------------
1. Go to: https://mailtrap.io
2. Click "Sign Up" (free)
3. Verify your email
4. Go to "Email Testing" → "My Inbox"
5. Click "Show Credentials"
6. Copy:
   - Host: sandbox.smtp.mailtrap.io
   - Port: 2525 (or 587, 25)
   - Username: (looks like 1a2b3c4d5e6f7g)
   - Password: (looks like h8i9j0k1l2m3n4)

STEP 2: UPDATE .env FILE
------------------------
Edit your .env file with:

EMAIL_HOST=sandbox.smtp.mailtrap.io
EMAIL_PORT=2525
EMAIL_USER=your_username_here
EMAIL_PASS=your_password_here
ADMIN_EMAIL=olasilvaolunleke@gmail.com

STEP 3: TEST
-----------
After updating .env, run:
node test-mailtrap-working.mjs

STEP 4: CHECK MAILTRAP
----------------------
Go to: https://mailtrap.io/inboxes
You should see test emails there!

STEP 5: TEST PORTFOLIO
----------------------
1. Start your server: node server.js
2. Open portfolio: http://localhost:3000
3. Submit contact form
4. Check Mailtrap inbox for the email

✅ That's it! Mailtrap is much easier than Gmail for development.
`);

// Create a sample .env content
const sampleEnv = `
# =========== MAILTRAP CONFIGURATION ===========
EMAIL_HOST=sandbox.smtp.mailtrap.io
EMAIL_PORT=2525
EMAIL_USER=your_mailtrap_username_here
EMAIL_PASS=your_mailtrap_password_here
ADMIN_EMAIL=olasilvaolunleke@gmail.com
`;

console.log('\n📝 Sample .env content:');
console.log(sampleEnv);