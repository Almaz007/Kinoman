import nodemailer from 'nodemailer';

export default class MailService {
	static async sendActivationMail(to, link) {
		const transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			port: process.env.SMTP_PORT,
			secure: false,
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASSWORD
			}
		});

		await transporter.sendMail(
			{
				from: process.env.SMTP_USER,
				to,
				subject: 'Активация аккаунта на ' + process.env.API_URL,
				text: '',
				html: `
                    <div>
                        <h1>Для активации перейдите по ссылке</h1>
                        <a href="${link}">${link}</a>
                    </div>
                `
			},
			function (error, response) {
				if (error) {
					throw new Conflict('Пользовтаель с таким email не найден');
				} else {
					console.log('mail sent');
				}
			}
		);
	}
}
