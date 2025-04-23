import nodemailer from 'nodemailer';

// Email configuration for Google Workspace
const emailConfig = {
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    // Do not fail on invalid certs
    rejectUnauthorized: false
  },
  // Gmail-specific settings
  pool: true,
  maxConnections: 1,
  maxMessages: 100,
  debug: true, // Enable debug output
  logger: true // Log information to console
};

// Create reusable transporter object
const createTransporter = async () => {
  try {
    console.log('Creating email transporter with config:', {
      host: emailConfig.host,
      port: emailConfig.port,
      secure: emailConfig.secure,
      auth: {
        user: emailConfig.auth.user,
        pass: emailConfig.auth.pass ? '****' : 'not set'
      }
    });
    
    const transporter = nodemailer.createTransport(emailConfig);
    
    // Verify connection configuration
    console.log('Verifying SMTP connection...');
    await transporter.verify();
    console.log('SMTP connection verified successfully');
    return transporter;
  } catch (error) {
    console.error('Error creating email transporter:', error);
    console.error('Error stack:', (error as Error).stack);
    throw error;
  }
};

// Common email styles
const emailStyles = {
  body: 'font-family: Inter, system-ui, sans-serif; margin: 0; padding: 0; background-color: #0a0a0a; color: #f8fafc;',
  container: 'max-width: 600px; margin: 0 auto; padding: 40px 20px;',
  header: 'text-align: center; margin-bottom: 30px;',
  logo: 'width: 150px; margin-bottom: 20px;',
  title: 'color: #a855f7; font-size: 28px; font-weight: 700; margin-bottom: 30px; text-align: center;',
  subtitle: 'color: #e9d5ff; font-size: 18px; font-weight: 600; margin: 25px 0 15px;',
  text: 'color: #d1d5db; line-height: 1.6; margin-bottom: 20px; font-size: 16px;',
  card: 'background-color: rgba(30, 30, 30, 0.7); border: 1px solid rgba(168, 85, 247, 0.3); border-radius: 12px; padding: 25px; margin-bottom: 25px; backdrop-filter: blur(10px);',
  button: 'display: inline-block; background: linear-gradient(90deg, #a855f7 0%, #7e22ce 100%); color: white; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; margin: 20px 0; text-align: center;',
  footer: 'text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid rgba(168, 85, 247, 0.3); font-size: 14px; color: #9ca3af;',
  highlight: 'color: #a855f7; font-weight: 600;',
  list: 'margin: 20px 0; padding-left: 20px;',
  listItem: 'margin-bottom: 10px; color: #d1d5db;',
  infoRow: 'display: flex; margin-bottom: 10px;',
  infoLabel: 'font-weight: 600; color: #e9d5ff; width: 100px; flex-shrink: 0;',
  infoValue: 'color: #d1d5db; flex-grow: 1;',
  disclaimer: 'background-color: rgba(30, 30, 30, 0.5); padding: 15px; border-radius: 8px; margin-top: 30px; font-style: italic; color: #9ca3af; font-size: 14px;'
};

// Send confirmation email to user
export async function sendUserConfirmation(userEmail: string, userName: string) {
  try {
    console.log(`Preparing to send confirmation email to ${userEmail}`);
    const transporter = await createTransporter();
    
    const mailOptions = {
      from: `"AIDEA Team" <${process.env.EMAIL_FROM}>`,
      to: userEmail,
      subject: "Thank you for contacting AIDEA",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Thank You for Contacting AIDEA</title>
        </head>
        <body style="${emailStyles.body}">
          <div style="${emailStyles.container}">
            <div style="${emailStyles.header}">
              <img src="${process.env.NEXT_PUBLIC_SITE_URL}/images/aidea-logo.svg" alt="AIDEA Logo" style="${emailStyles.logo}">
            </div>
            
            <h1 style="${emailStyles.title}">Thank You for Reaching Out!</h1>
            
            <div style="${emailStyles.card}">
              <p style="${emailStyles.text}">Hello <span style="${emailStyles.highlight}">${userName}</span>,</p>
              
              <p style="${emailStyles.text}">We've received your message and appreciate your interest in AIDEA. Our team is reviewing your inquiry and will get back to you as soon as possible.</p>
              
              <h2 style="${emailStyles.subtitle}">What Happens Next:</h2>
              
              <ul style="${emailStyles.list}">
                <li style="${emailStyles.listItem}">Our team will review your message within 24 hours</li>
                <li style="${emailStyles.listItem}">We'll reach out to schedule a consultation if needed</li>
                <li style="${emailStyles.listItem}">We'll provide you with a tailored response to your inquiry</li>
              </ul>
              
              <p style="${emailStyles.text}">If you have any urgent questions in the meantime, please don't hesitate to call us at <span style="${emailStyles.highlight}">${process.env.COMPANY_PHONE || '+972 52 660 2870'}</span>.</p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${process.env.NEXT_PUBLIC_SITE_URL}" style="${emailStyles.button}">Visit Our Website</a>
              </div>
            </div>
            
            <div style="${emailStyles.disclaimer}">
              <p style="margin: 0;">This is an automated message. Please do not reply to this email.</p>
            </div>
            
            <div style="${emailStyles.footer}">
              <p>&copy; ${new Date().getFullYear()} AIDEA. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };
    
    console.log('Sending confirmation email with options:', {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject
    });
    
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending user confirmation email:', error);
    console.error('Error stack:', (error as Error).stack);
    return { success: false, error };
  }
}

// Send notification email to admin
export async function sendAdminNotification(formData: any) {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const partnerEmail = process.env.PARTNER_EMAIL || 'tal.gr@aideallabs.com';
    
    if (!adminEmail) {
      throw new Error('Admin email not configured');
    }
    
    console.log(`Preparing to send admin notification to ${adminEmail} and ${partnerEmail}`);
    const transporter = await createTransporter();
    
    const mailOptions = {
      from: `"AIDEA Contact Form" <${process.env.EMAIL_FROM}>`,
      to: `${adminEmail}, ${partnerEmail}`,
      subject: `New Contact Form Submission from ${formData.name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Contact Form Submission</title>
        </head>
        <body style="${emailStyles.body}">
          <div style="${emailStyles.container}">
            <div style="${emailStyles.header}">
              <img src="${process.env.NEXT_PUBLIC_SITE_URL}/images/aidea-logo.svg" alt="AIDEA Logo" style="${emailStyles.logo}">
            </div>
            
            <h1 style="${emailStyles.title}">New Contact Form Submission</h1>
            
            <div style="${emailStyles.card}">
              <h2 style="${emailStyles.subtitle}">Contact Details:</h2>
              
              <div style="${emailStyles.infoRow}">
                <div style="${emailStyles.infoLabel}">Name:</div>
                <div style="${emailStyles.infoValue}">${formData.name}</div>
              </div>
              
              <div style="${emailStyles.infoRow}">
                <div style="${emailStyles.infoLabel}">Email:</div>
                <div style="${emailStyles.infoValue}"><a href="mailto:${formData.email}" style="color: #a855f7; text-decoration: none;">${formData.email}</a></div>
              </div>
              
              <div style="${emailStyles.infoRow}">
                <div style="${emailStyles.infoLabel}">Phone:</div>
                <div style="${emailStyles.infoValue}"><a href="tel:${formData.phone}" style="color: #a855f7; text-decoration: none;">${formData.phone}</a></div>
              </div>
              
              <div style="${emailStyles.infoRow}">
                <div style="${emailStyles.infoLabel}">Company:</div>
                <div style="${emailStyles.infoValue}">${formData.company || 'Not provided'}</div>
              </div>
              
              <div style="${emailStyles.infoRow}">
                <div style="${emailStyles.infoLabel}">Budget:</div>
                <div style="${emailStyles.infoValue}">${formData.budget || 'Not provided'}</div>
              </div>
            </div>
            
            <div style="${emailStyles.card}">
              <h2 style="${emailStyles.subtitle}">Message:</h2>
              <p style="${emailStyles.text}; white-space: pre-line;">${formData.message}</p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin/contacts" style="${emailStyles.button}">View All Submissions</a>
            </div>
            
            <div style="${emailStyles.disclaimer}">
              <p style="margin: 0;">This submission was received on ${new Date().toLocaleString()}.</p>
            </div>
            
            <div style="${emailStyles.footer}">
              <p>&copy; ${new Date().getFullYear()} AIDEA. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };
    
    console.log('Sending admin notification with options:', {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject
    });
    
    const info = await transporter.sendMail(mailOptions);
    console.log('Admin email sent successfully:', info.messageId);
    
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending admin notification email:', error);
    console.error('Error stack:', (error as Error).stack);
    return { success: false, error };
  }
}
