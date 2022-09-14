import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuDto } from './dto/menu.dto';
import { menu_ent } from './menu.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(menu_ent)
    private readonly menuRepository: Repository<menu_ent>,
  ) {}

  async getCatMenu(cat: string) {
    return await this.menuRepository
      .createQueryBuilder('menu_ent')
      .where('menu_ent.category=:cat', { cat: cat })
      .getMany();
  }

  async getMenuItem(id: number) {
    return await this.menuRepository
      .createQueryBuilder('menu_ent')
      .where('menu_ent.id=:id', { id: id })
      .getOne();
  }

  insertItem(menuItem: MenuDto) {
    return this.menuRepository.save(menuItem);
  }
}
