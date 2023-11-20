import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AuditRepository } from './audit.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Audit, Criteria } from './audit.entity';
import * as config from 'config';
import * as jwt from 'jsonwebtoken';
import * as schedule from 'node-schedule';
import { v4 as uuidv4 } from 'uuid';
import { CreateAudit } from './audit.dto';
import * as nodemailer from 'nodemailer';




const jwtConfig = config.get('jwt');


@Injectable()
export class AuditService {

    constructor(
        @InjectRepository(AuditRepository)
        private auditRepository: AuditRepository,
    ) { }


    async createAudit(createAudit: CreateAudit): Promise<Audit> {
        const audit = new Audit();
        audit.criteria = [];
        audit.url = createAudit.url;
        audit.siteName = createAudit.siteName;
        audit.nameAuditor = createAudit.nameAuditor;
        audit.emailAuditor = createAudit.emailAuditor;
        audit.renderEmail = createAudit.renderEmail;
        audit.structureName = createAudit.structureName;

        const payload = { auditId: audit.id };
        const secret = jwtConfig.secret;
        const options = { expiresIn: '2w' };
        const token = jwt.sign(payload, secret, options);
        audit.tokenJwt = token;
        audit.token = uuidv4();
        try {
            await audit.save();
            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                auth: {
                  user: 'strouchaud@dev-id.fr',
                  pass: 'signhhwgtoujrrer',
                },
              });


              const mailOptions = {
                from: 'strouchaud@dev-id.fr',
                to: createAudit.emailAuditor,
                subject: `Création de votre audit ${audit.siteName}`,
                html: `
                    <html>
                        <body>
                            <div style="font-family: Arial, sans-serif; color: black;">
                                <h1>Bonjour</h1>
                                <p>Vous venez de créer l'audit <strong>${audit.siteName}</strong>.</p>
                                <p>Vous trouverez ci-dessous le lien administrateur de l'audit. Pensez-bien à le conserver, c'est le seul moyen de reprendre l'édition de l'audit.</p>
                                <div style="background-color: #f0f0f0; padding: 10px; margin: 10px 0;">
                                    <p><strong>Lien vers l'audit - Ne pas partager</strong></p>
                                    <a href="https://rgesn.meexr.fr/${audit.token}" target="_blank" style="text-decoration: none; color: #0000EE;">Lien d'administration de l'audit</a>
                                </div>
                  
                                <p>Vous avez une question ?</p>
                                <p>Vous pouvez nous contacter en utilisant l'adresse e-mail <a href="mailto:strouchaud@dev-id.fr" target="_blank" style="text-decoration: none; color: #0000EE;">strouchaud@dev-id.fr</a>.</p>
                                <p style="color: #777;">Propulsé avec ❤️ par l'équipe Green-id</p>
                                <div style="border-top: 1px solid #ccc; padding-top: 10px; margin-top: 10px;">
                                    <p style="font-size: 0.8em; color: #777;">Cet e-mail est envoyé automatiquement, merci de ne pas y répondre.</p>
                                </div>
                            </div>
                        </body>
                    </html>
                `,
            };

              await transporter.sendMail(mailOptions);

            const expirationTime = new Date(Date.now() + 2 * 7 * 24 * 60 * 60 * 1000); // 2 weeks from now
            schedule.scheduleJob(expirationTime, async () => {
              const token = await this.auditRepository.getToken(audit.id);
              try {
                jwt.verify(token, secret); // this will throw an error if the token has expired
              } catch (error) {
                await this.auditRepository.delete(audit.id);
              }
            });
            return audit;
        }
        catch (error) {
            throw new InternalServerErrorException();
        }

    }

    async getAudit(token: string): Promise<Audit> {
        return this.auditRepository.getAudit(token);
    }

    async deleteAudit(id: number): Promise<void> {
        const result = await this.auditRepository.delete(id);
        if (result.affected === 0) {
            throw new InternalServerErrorException();
        }
    }

    async updateAudit(token: string, criteria: Criteria[]): Promise<Audit> {
        const audit = await this.auditRepository.getAudit(token);
        audit.criteria = criteria;
        try {
            await audit.save();
            return audit;
        }
        catch (error) {
            throw new InternalServerErrorException();
        }
    }

    async getAllAudits(): Promise<Audit[]> {
        const query = this.auditRepository.createQueryBuilder('audit');
        try {
            const audits = await query.getMany();
            return audits;
        }
        catch (error) {
            throw new InternalServerErrorException();
        }
    }

}
