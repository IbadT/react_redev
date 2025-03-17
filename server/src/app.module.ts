import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { YoutubeModule } from './youtube/youtube.module';
import { FavoritiesModule } from './favorities/favorities.module';
import { VideosModule } from './videos/videos.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './auth/entities/user.entity';
import { FavoriteEntity } from './favorities/entities/favority.entity';
import { VideoEntity } from './videos/entities/video.entity';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'youtubespa',
      entities: [UserEntity, FavoriteEntity, VideoEntity],
      synchronize: true,
    }),
    JwtModule.register({
      global: true,
      secret: "some_secret_word",
      signOptions: { expiresIn: '15m' },
    }),
    ConfigModule.forRoot(), 
    AuthModule, YoutubeModule, FavoritiesModule, VideosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
