import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { FavoritiesService, ResponseObject } from './favorities.service';
import { CreateFavoriteDto, CreateFavorityDto, CreateVideoDto } from './dto/create-favority.dto';
import { UpdateFavorityDto } from './dto/update-favority.dto';
import { ApiSecurity } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { FavoriteEntity } from './entities/favority.entity';
import { Request } from 'express';

@ApiSecurity('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('favorities')
export class FavoritiesController {
  constructor(private readonly favoritiesService: FavoritiesService) {}

  @Get()
  async getAllFavorities(
    // @Param("id") id: string
    @Req() request: Request
  // ): Promise<FavoriteEntity[]> {
  ): Promise<ResponseObject[]> {
    const { id } = request.user;
    return this.favoritiesService.getAllFavorities(id);
  };

  @Post()
  async addFavorite(@Body() body: CreateFavorityDto, @Req() request: Request): Promise<FavoriteEntity> {
    const { id } = request.user;
    return this.favoritiesService.addFavorite(id, body);
  };



  // @Post()
  // @UsePipes(new ValidationPipe({ transform: true })) // Валидация DTO
  // async addFavorite(
  //   @Body('favorite') favoriteData: CreateFavoriteDto, // Данные для QueryData
  //   @Body('videos') videosData: CreateVideoDto[], // Данные для QueryResult[]
  //   @Req() request: Request, // Запрос для получения user_id
  // ) {
  //   const { id } = request.user; // Получаем ID пользователя из запроса
  //   return this.favoritiesService.addFavorite(id, favoriteData, videosData);
  // }




  @Patch(":id")
  async updateFavorite(@Body() body: UpdateFavorityDto, @Param("id") id: string) {
    return this.favoritiesService.updateFavorite(id, body);
  };

  @Delete(":id")
  async deleteFavoriteById(@Param("id") id: string) {
    return this.favoritiesService.deleteFavoriteById(id);
  }
}
