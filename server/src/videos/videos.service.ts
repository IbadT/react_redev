import { Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { VideoEntity } from './entities/video.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class VideosService {
  constructor(
    @InjectRepository(VideoEntity)
    private readonly videoRepository: Repository<VideoEntity>
  ) {}

  async getAllVideos(ids: string[]) {
    return await this.videoRepository.find({
      where: {
        id: In(ids)
      }
    });
  };

  // async createVideos(body: CreateVideoDto) {
  async createVideos(body: CreateVideoDto[]) {
    const video = this.videoRepository.create(body);
    return await this.videoRepository.save(video);
  };

}
