import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuditService } from './audit.service';
import { AuthGuard } from '@nestjs/passport';
import { Audit, Criteria } from './audit.entity';
import { CreateAudit } from './audit.dto';

@Controller('audit')
export class AuditController {
    constructor(private auditService: AuditService) {}

    @Post()
    async createAudit(
        @Body(ValidationPipe) createAudit: CreateAudit,
    ): Promise<Audit> {
        return this.auditService.createAudit(createAudit);
    }

    @Get('/:token')
    async getAudit(
        @Param('token') token: string,
    ): Promise<Audit> {
        return this.auditService.getAudit(token);
    }

    @Delete('/:id')
    async deleteAudit(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<void> {
        return this.auditService.deleteAudit(id);
    }

    @Patch('/:token')
    async updateCriteria(
        @Param('token') token: string,
        @Body() criteria: Criteria[],
    ): Promise<Audit> {
        return this.auditService.updateAudit(token, criteria);
    }

    @Get()
    async getAudits(): Promise<Audit[]> {
        return this.auditService.getAllAudits();
    }

}



