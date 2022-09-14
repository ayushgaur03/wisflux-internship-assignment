import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { menu_ent } from './menu/menu.entity';
import { MenuModule } from './menu/menu.module';
import { orders_ent } from './orders/orders.entity';
import { OrdersModule } from './orders/orders.module';
import { users_ent } from './users/users.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'assets'),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      username: 'postgres',
      password: 'postgres',
      port: 5425,
      host: 'localhost',
      database: 'pizzastore',
      synchronize: true,
      entities: [users_ent, menu_ent, orders_ent],
    }),
    UsersModule,
    MenuModule,
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
