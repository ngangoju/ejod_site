import nodemailer from 'nodemailer';

// Simple in-memory rate limiter (replace with Redis/Upstash for scaled production)
const rateLimitMap = new Map();

function getMailConfig() {
  const user = process.env.EMAIL_USER?.trim();
  const pass = process.env.EMAIL_PASS?.replace(/\s+/g, '');
  const to = process.env.EMAIL_TO?.trim();
  const from = process.env.EMAIL_FROM?.trim() || user;

  if (!user || !pass || !to) {
    return null;
  }

  return { user, pass, to, from };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Rate Limiting: max 3 requests per 10 minutes per IP
  const ip = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown';
  const now = Date.now();
  const windowMs = 10 * 60 * 1000;
  const limit = 3;
  const recentRecords = (rateLimitMap.get(ip) || []).filter(t => now - t < windowMs);
  
  if (recentRecords.length >= limit) {
    return res.status(429).json({ message: 'Too many requests. Please try again later.' });
  }
  rateLimitMap.set(ip, [...recentRecords, now]);

  const { name, email, organization, projectType, message } = req.body;

  // Server-side validation
  if (!name?.trim() || name.length > 100) {
    return res.status(400).json({ message: 'Invalid name provided' });
  }
  if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    return res.status(400).json({ message: 'Invalid email address' });
  }
  if (!message?.trim() || message.length > 5000) {
    return res.status(400).json({ message: 'Message must be between 1 and 5000 characters' });
  }

  const mailConfig = getMailConfig();

  if (!mailConfig) {
    console.error('[Contact API] Missing required mail environment variables.');
    return res.status(500).json({ message: 'Email delivery is not configured yet. Please contact us directly.' });
  }

  // Create transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: mailConfig.user,
      pass: mailConfig.pass,
    },
  });

  const projectTypeLabels = {
    '3d-visualization': '3D Visualization',
    'vr-training': 'VR Training',
    'ar-application': 'AR Application',
    'custom-xr': 'Custom XR Development',
    'consultation': 'Consultation / Discovery',
    'other': 'Other',
  };

  const emailContent = `
New Contact Form Submission from EJOD Website

Name: ${name}
Email: ${email}
Organization: ${organization || 'Not provided'}
Project Type: ${projectTypeLabels[projectType] || projectType || 'Not specified'}

Message:
${message}
---
This email was sent from the EJOD website contact form.
  `;

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #FF6B35, #06B6D4); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
    .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px; }
    .field { margin-bottom: 15px; }
    .label { font-weight: bold; color: #FF6B35; }
    .value { margin-top: 5px; }
    .message-box { background: white; padding: 15px; border-radius: 8px; border: 1px solid #e5e7eb; margin-top: 10px; }
    .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2 style="margin: 0;">New Contact Form Submission</h2>
      <p style="margin: 5px 0 0 0; opacity: 0.9;">EJOD Website</p>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">Name</div>
        <div class="value">${name}</div>
      </div>
      <div class="field">
        <div class="label">Email</div>
        <div class="value"><a href="mailto:${email}">${email}</a></div>
      </div>
      <div class="field">
        <div class="label">Organization</div>
        <div class="value">${organization || 'Not provided'}</div>
      </div>
      <div class="field">
        <div class="label">Project Type</div>
        <div class="value">${projectTypeLabels[projectType] || projectType || 'Not specified'}</div>
      </div>
      <div class="field">
        <div class="label">Message</div>
        <div class="message-box">${message.replace(/\n/g, '<br>')}</div>
      </div>
    </div>
    <div class="footer">
      This email was sent from the EJOD website contact form.
    </div>
  </div>
</body>
</html>
  `;

  try {
    await transporter.sendMail({
      from: `"EJOD Website" <${mailConfig.from}>`,
      to: mailConfig.to,
      replyTo: email,
      subject: `New Contact: ${name} - ${projectTypeLabels[projectType] || 'General Inquiry'}`,
      text: emailContent,
      html: htmlContent,
    });

    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    // Only log internally, don't leak details and stack traces to client
    console.error('[Contact API] Mail error:', error);
    return res.status(500).json({ message: 'Email delivery is temporarily unavailable. Please contact us directly.' });
  }
}
