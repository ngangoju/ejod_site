import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, organization, projectType, message } = req.body;

  // Validate required fields
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // Create transporter - using Gmail SMTP
  // For production, use environment variables for credentials
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER || 'your-email@gmail.com',
      pass: process.env.EMAIL_PASS || 'your-app-password',
    },
  });

  // Project type labels
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
    .header { background: linear-gradient(135deg, #7C3AED, #06B6D4); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
    .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px; }
    .field { margin-bottom: 15px; }
    .label { font-weight: bold; color: #7C3AED; }
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
      from: `"EJOD Website" <${process.env.EMAIL_USER || 'noreply@ejod.com'}>`,
      to: 'techtr1990@gmail.com',
      replyTo: email,
      subject: `New Contact: ${name} - ${projectTypeLabels[projectType] || 'General Inquiry'}`,
      text: emailContent,
      html: htmlContent,
    });

    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email error:', error);
    return res.status(500).json({ message: 'Failed to send email', error: error.message });
  }
}
