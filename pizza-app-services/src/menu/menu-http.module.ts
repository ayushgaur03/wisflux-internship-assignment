import { Module } from '@nestjs/common';
import { MenuController } from './menu.controller';
import { MenuModule } from './menu.module';
import { MenuService } from './menu.service';

@Module({
  imports: [MenuModule],
  providers: [MenuService],
  controllers: [MenuController],
})
export class MenuHttpModule {}
