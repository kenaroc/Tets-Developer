import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetModule } from './asset/asset.module';
import { Asset } from './asset/entities/asset.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin123',     // sesuaikan
      database: 'asset_fumindo', // tanpa ;
      entities: [Asset],
      synchronize: true,
    }),
    AssetModule,
  ],
})
export class AppModule {}
