import { Controller, Get, Query } from '@nestjs/common';
import { YoutubeService } from './youtube.service';

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
