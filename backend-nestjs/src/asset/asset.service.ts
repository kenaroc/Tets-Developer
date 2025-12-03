import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asset } from './entities/asset.entity';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';

@Injectable()
export class AssetService {
  constructor(
    @InjectRepository(Asset)
    private assetRepo: Repository<Asset>,
  ) {}

  create(data: CreateAssetDto) {
    return this.assetRepo.save(data);
  }

  findAll() {
    return this.assetRepo.find();
  }

  findOne(id: number) {
    return this.assetRepo.findOne({ where: { asset_id: id } });
  }

  update(id: number, data: UpdateAssetDto) {
    return this.assetRepo.update(id, data);
  }

  remove(id: number) {
    return this.assetRepo.delete(id);
  }
}
