var nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_PASSWORD
    }
});

exports.send = async function (payload) {
  const msg = {
    to: payload.to,
    from: process.env.SENDER_EMAIL,
    subject: payload.title,
    html: payload.message,
  };
  try {
    const sendEmail = await transporter.sendMail(msg);
    return sendEmail;
  } catch (err) {
    console.log({ err });
    throw err;
  }
};



exports.verifyEmailTemplate = async (otp, owner, companyName) => {
    try {
      return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Verify Your Account</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                }
                .email-container {
                    background-color: #ffffff;
                    max-width: 600px;
                    margin: 20px auto;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                .header {
                    text-align: center;
                    background-color: #0b66ef;
                    color: #ffffff;
                    padding: 10px;
                    border-radius: 8px 8px 0 0;
                }
                .content {
                    margin-top: 20px;
                    line-height: 1.6;
                }
                .otp-code {
                    font-size: 24px;
                    font-weight: bold;
                    color: #333333;
                    text-align: center;
                    margin: 20px 0;
                }
                .footer {
                    margin-top: 30px;
                    text-align: center;
                    font-size: 12px;
                    color: #888888;
                }
            </style>
        </head>
        <body>
            <div className="email-container">
                <div className="header">
                    <h2>Verify Your Job Board Account</h2>
                </div>
                <div className="content">
                    <p>Hi <strong>${owner}</strong>,</p>
                    <p>Thank you for registering your company <strong>${companyName}</strong> with our job board. To complete your account setup, please use the verification code below:</p>
                    <div className="otp-code">${otp}</div>
                    <p>If you did not request this, please ignore this email or contact our support team.</p>
                </div>
                <div className="footer">
                    <p>© 2024 Job Board, Inc. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>`;
    } catch (error) {
      throw error;
    }
  };
  
exports.jobCreationTemplate = async (jobTitle, jobDescription, experienceLevel, companyName, endDate) => {
    try {
      return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Job Posted</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                }
                .email-container {
                    background-color: #ffffff;
                    max-width: 600px;
                    margin: 20px auto;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                .header {
                    text-align: center;
                    background-color: #0b66ef;
                    color: #ffffff;
                    padding: 10px;
                    border-radius: 8px 8px 0 0;
                }
                .content {
                    margin-top: 20px;
                    line-height: 1.6;
                }
                .footer {
                    margin-top: 30px;
                    text-align: center;
                    font-size: 12px;
                    color: #888888;
                }
            </style>
        </head>
        <body>
            <div className="email-container">
                <div className="header">
                    <h2>New Job Posted: ${jobTitle}</h2>
                </div>
                <div className="content">
                    <p>Dear Candidate,</p>
                    <p>We are pleased to inform you that a new job opening for <strong>${jobTitle}</strong> has been posted by <strong>${companyName}</strong>. Here are the job details:</p>
                    <ul>
                        <li><strong>Job Title:</strong> ${jobTitle}</li>
                        <li><strong>Description:</strong> ${jobDescription}</li>
                        <li><strong>Experience Level:</strong> ${experienceLevel} years</li>
                        <li><strong>Application Deadline:</strong> ${endDate}</li>
                    </ul>
                    <p>If you're interested, please send your CV by replying to this email.</p>
                </div>
                <div className="footer">
                    <p>© 2024 Job Board, Inc. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>`;
    } catch (error) {
      throw error;
    }
  };
  
exports.thankYouTemplate = async (owner, companyName) => {
    try {
      return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Thank You for Verifying Your Account</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                }
                .email-container {
                    background-color: #ffffff;
                    max-width: 600px;
                    margin: 20px auto;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                .header {
                    text-align: center;
                    background-color: #0b66ef;
                    color: #ffffff;
                    padding: 10px;
                    border-radius: 8px 8px 0 0;
                }
                .content {
                    margin-top: 20px;
                    line-height: 1.6;
                }
                .footer {
                    margin-top: 30px;
                    text-align: center;
                    font-size: 12px;
                    color: #888888;
                }
            </style>
        </head>
        <body>
            <div className="email-container">
                <div className="header">
                    <h2>Thank You for Verifying Your Account</h2>
                </div>
                <div className="content">
                    <p>Dear <strong>${owner}</strong>,</p>
                    <p>Your account for <strong>${companyName}</strong> has been successfully verified! Thank you for confirming your email. You can now access all the features of our job board and start posting jobs.</p>
                    <p>If you have any questions or need assistance, feel free to contact us.</p>
                </div>
                <div className="footer">
                    <p>© 2024 Job Board, Inc. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>`;
    } catch (error) {
      throw error;
    }
  };
