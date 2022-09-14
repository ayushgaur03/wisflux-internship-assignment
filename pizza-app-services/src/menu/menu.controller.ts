import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { MenuInterface } from './interfaces/menu.interface';
import { MenuService } from './menu.service';

@Controller('menu')
export class MenuController {
  constructor(private menuService: MenuService) {}

  @Get()
  getCatMenu(@Query('cat') cat: string) {
    return this.menuService.getCatMenu(cat);
  }

  @Get('/:id')
  getMenuItem(@Param('id') id: string) {
    return this.menuService.getMenuItem(parseInt(id.substring(1)));
  }

  @Post()
  insertItem(@Body() body: MenuInterface) {
    return this.menuService.insertItem(body);
  }
}
