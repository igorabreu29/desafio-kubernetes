import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	getHello(): string {
		return this.appService.getHello();
	}

	@Get('users')
	getUsers() {
		return this.appService.getUsers();
  }

  @Post('data')
	insert() {
		return this.appService.insert();
	}
}
