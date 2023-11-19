import { Module } from '@nestjs/common';
import { AuditController } from './audit.controller';
import { AuditService } from './audit.service';
import { PassportModule } from '@nestjs/passport';
import { AuditRepository } from './audit.repository';
import { TypeOrmExModule } from 'src/database/typeorm-ex.module';

@Module({

  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmExModule.forCustomRepository([AuditRepository]),
  ],
  controllers: [AuditController],
  providers: [AuditService],
  exports: [
    PassportModule,
  ]
})
export class AuditModule {}
