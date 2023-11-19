import { Module } from '@nestjs/common';

import { AuditModule } from './audit/audit.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [AuditModule,
    TypeOrmModule.forRoot(typeOrmConfig),
  ]
})
export class AppModule {}
