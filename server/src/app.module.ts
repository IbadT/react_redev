import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { YoutubeModule } from './youtube/youtube.module';
import { FavoritiesModule } from './favorities/favorities.module';
import { VideosModule } from './videos/videos.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './auth/entities/user.entity';
import { FavoriteEntity } from './favorities/entities/favority.entity';
import { VideoEntity } from './videos/entities/video.entity';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }), 
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: (configService: ConfigService) => ({
    //     type: 'postgres',
    //     host: configService.get<string>('POSTGRES_HOST'),
    //     // port: configService.get<number>('POSTGRES_PORT'),
    //     port: 5432,
    //     username: configService.get<string>('POSTGRES_USERNAME'),
    //     password: configService.get<string>('POSTGRES_PASSWORD'),
    //     database: configService.get<string>('POSTGRES_DATABASE'),
    //     entities: [UserEntity, FavoriteEntity, VideoEntity],
    //     synchronize: true,
    //   }),
    //   inject: [ConfigService],
    // }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: "postgresql://postgresql:7VozEDioECU40oPCqsnf5hwwvy8XJHRX@dpg-cvclgfhu0jms73etg710-a/youtubespa",
      // host: 'db',
      // port: 5432,
      // username: 'postgres',
      // password: 'postgres',
      // database: 'youtubespa',
      entities: [UserEntity, FavoriteEntity, VideoEntity],
      synchronize: true,
    }),
    JwtModule.register({
      global: true,
      secret: "some_secret_word",
      signOptions: { expiresIn: '15m' },
    }),
    AuthModule, YoutubeModule, FavoritiesModule, VideosModule
  ],
})
export class AppModule {}
