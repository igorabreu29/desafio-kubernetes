import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { DrizzleModule } from 'src/db/drizzle.module';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';

@Module({
	imports: [TerminusModule, DrizzleModule],
	controllers: [HealthController],
	providers: [HealthService],
})
export class HealthModule {}
