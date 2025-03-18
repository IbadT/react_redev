import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { FavoritiesService, ResponseObject } from './favorities.service';
import { CreateFavorityDto } from './dto/create-favority.dto';
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
    @Req() request: Request
  ): Promise<ResponseObject[]> {
    const { id } = request.user;
    return this.favoritiesService.getAllFavorities(id);
  };

  @Post()
  async addFavorite(@Body() body: CreateFavorityDto, @Req() request: Request): Promise<FavoriteEntity> {
    const { id } = request.user;
    return this.favoritiesService.addFavorite(id, body);
  };


  @Patch(":id")
  async updateFavorite(@Body() body: UpdateFavorityDto, @Param("id") id: string) {
    return this.favoritiesService.updateFavorite(id, body);
  };

  @Delete(":id")
  async deleteFavoriteById(@Param("id") id: string) {
    return this.favoritiesService.deleteFavoriteById(id);
  }
}
