import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  // async createVideos(@Body() body: CreateVideoDto) {
  async createVideos(@Body() body: CreateVideoDto[]) {
    return this.videosService.createVideos(body);
  }
}
