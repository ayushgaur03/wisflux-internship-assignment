import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuController } from './menu.controller';
import { menu_ent } from './menu.entity';
import { MenuService } from './menu.service';

@Module({
  controllers: [MenuController],
  imports: [TypeOrmModule.forFeature([menu_ent])],
  providers: [MenuService],
})
export class MenuModule {}
