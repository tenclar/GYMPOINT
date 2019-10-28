export default {
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
  },
  default: {
    from: 'equipe GYMPoint <noreply@gobarber.com',
  },
};
