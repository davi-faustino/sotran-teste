import nodemailer from 'nodemailer';
import path from 'path';
import fs from 'fs';
import printf from 'printf';

export default {
  async sendMail(id:number, nome:string, email:string) {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: 'davi.esquadrilon@gmail.com',
        pass: 'qw19mh09df'
      },
    });

    await transporter.sendMail({
      from: 'Sotran Teste <davi.esquadrilon@gmail.com>',
      to: `${nome} <${email}>`,
      subject: 'Atualização de cadastro',
      html: 
        printf(
          fs.readFileSync(
            path.resolve(
              __dirname,
              'templatemail.html'
            ),
            'utf8'
          ),
          id
        )
    });
  }
}