import { Repository } from "typeorm";
import { Audit } from "./audit.entity";
import { CustomRepository } from "src/database/typeorm-ex.decorator";
import { InternalServerErrorException } from "@nestjs/common";

@CustomRepository(Audit)
export class AuditRepository extends Repository<Audit> {
    async getToken(id: number) {
        const query = this.createQueryBuilder('audit');
        query.where('audit.id = :id', { id });
        try {
            const audit = await query.getOne();
            return audit.tokenJwt;
        }
        catch (error) {
            console.log(error);
            throw new InternalServerErrorException();
        }
    }


    async getAudit(token: string): Promise<Audit> {
        const query = this.createQueryBuilder('audit');
        query.where('audit.token = :token', { token });
        try {
            const audit = await query.getOne();
            return audit;
        }
        catch (error) {
            console.log(error);
            throw new InternalServerErrorException();
        }
    }
}