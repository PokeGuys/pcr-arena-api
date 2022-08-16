import { existsSync, mkdirSync, writeFileSync } from 'fs';
import * as path from 'path';
import { Command } from 'nestjs-command';
import { Injectable, Logger } from '@nestjs/common';
import { createSwaggerDocument } from '@common/swagger';
import { setupApplication } from '@src/app';

@Injectable()
export class GenerateSwaggerCommand {
  @Command({
    command: 'generate:swagger',
    describe: 'Generate a swagger specification',
  })
  public async generate(): Promise<void> {
    const app = await setupApplication();
    const document = createSwaggerDocument(app);
    const destination = path.join(__dirname, '../../docs');
    if (!existsSync(destination)) {
      mkdirSync(destination);
    }
    writeFileSync(`${destination}/swagger.json`, JSON.stringify(document), {
      encoding: 'utf8',
    });

    Logger.log('Swagger specification generated.', GenerateSwaggerCommand.name);
  }
}
