import { IsNotEmpty, IsString } from "class-validator";
import { UserEntity } from "src/auth/entities/user.entity";
import { VideoEntity } from "src/videos/entities/video.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("favorities")
export class FavoriteEntity {
    @PrimaryGeneratedColumn("uuid")
    readonly id: string;

    @Column({ type: "varchar", nullable: false })
    readonly title: string;

    @Column({ type: "varchar", nullable: false })
    readonly name: string;
    
    @Column({ type: "varchar", nullable: false, default: "none" })
    readonly sorted: string;
    
    @Column({ type: "varchar", nullable: false, default: "50" })
    readonly maxCount: string;


    @ManyToOne(() => UserEntity, (user) => user.favorites, { onDelete: "CASCADE" })
    @JoinColumn({ name: "user_id" }) // Указываем имя колонки в БД
    readonly user: UserEntity; // Используем сущность, а не ID

    // @OneToOne(() => VideoEntity, (video) => video.favorite, { cascade: true })
    // @JoinColumn({ name: "video_id" }) // Указываем имя колонки в БД
    // readonly video: VideoEntity; // Используем сущность, а не ID

    @ManyToMany(() => VideoEntity, (video) => video.favorites, { cascade: true })
    @JoinTable({
        name: 'favorite_videos', // Имя промежуточной таблицы
        joinColumn: {
        name: 'favorite_id', // Колонка, ссылающаяся на FavoriteEntity
        referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'video_id', // Колонка, ссылающаяся на VideoEntity
            referencedColumnName: 'id',
        },
    })
    videos: VideoEntity[]; // Массив видео


    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
};

// export interface QueryData {
//   id: string;
//   title: string;
//   name: string;
//   sorted: string;
//   maxCount: string;
// }