import { Injectable } from '@nestjs/common';
import { CreateFavorityDto } from './dto/create-favority.dto';
import { UpdateFavorityDto } from './dto/update-favority.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FavoriteEntity } from './entities/favority.entity';
import { In, Repository } from 'typeorm';
import { VideosService } from 'src/videos/videos.service';

export interface QueryData {
  id: string;
  title: string;
  name: string;
  sorted: string;
  maxCount: string;
}

export interface QueryResult {
  id: string;
  title: string;
  videoId: string;
  likeCount: string;
  viewCount: string;
  commentCount: string;
  description: string;
  date: string;
}

export interface ResponseObject {
  queryData: QueryData;
  queryResult: QueryResult[];
}


@Injectable()
export class FavoritiesService {
  constructor(
    @InjectRepository(FavoriteEntity)
    private readonly favoriteRepository: Repository<FavoriteEntity>,
    private readonly videosService: VideosService,
  ) {}

  // async getAllFavorities(id: string): Promise<FavoriteEntity[]> {
  async getAllFavorities(id: string): Promise<ResponseObject[]> {
    const response = await this.favoriteRepository.find({ 
      where: { user: { id }}, 
      relations: ['videos'],
      select: {
        id: true,
        title: true,
        name: true,
        sorted: true,
        maxCount: true,
        videos: {
          id: true,
          title: true,
          likeCount: true,
          viewCount: true,
          videoId: true,
          description: true,
          commentCount: true,
          date: true,
        }
      }
    });
    return response.map(item => {
      const { videos, ...rest } = item;
      return {
        queryData: rest,
        queryResult: videos
      }
    });
  };

  async addFavorite(user_id: string, body: CreateFavorityDto): Promise<FavoriteEntity> {
    const { videoIds, ...anotherFields } = body;
    console.log();
    

    const videos = await this.videosService.getAllVideos(videoIds);

    const favorite = this.favoriteRepository.create({
      user: { 
        id: user_id
      }, 
      videos,
      ...anotherFields
    });
    return this.favoriteRepository.save(favorite);
  };
  
  async updateFavorite(id: string, body: Partial<CreateFavorityDto>) {
    const { videoIds, ...anotherFields } = body;

    await this.favoriteRepository.update(id, {
      ...anotherFields,
      // videos: videoIds
    });

    return this.favoriteRepository.findOne({ where: { id } });
  };

  async deleteFavoriteById(id: string) {
    return await this.favoriteRepository.delete({ id });
  };
}
