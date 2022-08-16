import { CommandModule } from 'nestjs-command';
import { Module } from '@nestjs/common';
import { GenerateSwaggerCommand } from '@commands/generate-swagger.command';
import { BootstrapModule } from '@common/bootstrap.module';

@Module({
  imports: [BootstrapModule, CommandModule],
  providers: [GenerateSwaggerCommand],
})
export class CliCommandModule {}
