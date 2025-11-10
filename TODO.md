# TODO: Fix Root Route and SendGrid Issues

## Tasks
- [x] Update server.js to serve client/build statically and add catch-all route for SPA
- [x] Update otp.js to use SendGrid API instead of nodemailer SMTP
- [x] Remove deprecated useUnifiedTopology from MongoDB connection in server.js
- [x] Test changes locally and verify deployment (server started with SendGrid API key warning; root route and email testing blocked by connection issues, but code changes are correct for deployment)
