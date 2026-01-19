import { Controller, Get } from '@nestjs/common';
import { HealthService } from './health.service';

@Controller()
export class HealthController {
	constructor(private healthService: HealthService) {}

	@Get('/healthz')
	healthz(): string {
		return this.healthService.checkHealth();
	}

	@Get('/readyz')
	readyz(): Promise<string> {
		return this.healthService.checkRead();
	}
}
