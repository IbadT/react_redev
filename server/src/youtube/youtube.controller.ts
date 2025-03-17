import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { YoutubeService } from './youtube.service';
import { CreateYoutubeDto } from './dto/create-youtube.dto';
import { UpdateYoutubeDto } from './dto/update-youtube.dto';

@Controller('youtube')
export class YoutubeController {
  constructor(private readonly youtubeService: YoutubeService) {}

  @Get()
  async fetchYoutubeVideos(@Query('searchQuery') searchQuery: string, @Query('maxResults') maxResults: string) {
    console.log({
      s: searchQuery,
      m: maxResults
    });
    
    return this.youtubeService.fetchYoutubeVideos(searchQuery, maxResults);
  }
}
