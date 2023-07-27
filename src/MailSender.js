const nodemailer = require('nodemailer');

class MailSender {
  constructor() {
    this._transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  sendEmail(targetEmail, content) {
    // Parameter targetEmail adalah email tujuan.
    // Parameter content adalah data notes (hanya menerima string).

    // Message configuration.
    const message = {
      from: 'Notes Apps',
      to: targetEmail,
      subject: 'Export Catatan',
      text: 'Terlampir hasil dari export catatan',
      attachments: [
        {
          file: 'notes.json',
          content,
        },
      ],
    };

    // Mengirim email menggunakan transporter.
    return this._transporter.sendMail(message);
  }
}

module.exports = MailSender;
