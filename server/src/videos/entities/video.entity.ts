import { IsNotEmpty, IsString } from "class-validator";
import { FavoriteEntity } from "src/favorities/entities/favority.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("videos")
export class VideoEntity {
    @PrimaryGeneratedColumn("uuid")
    readonly id: string;

    @Column({ type: "varchar", nullable: false })
    readonly title: string;

    @Column({ type: "varchar", nullable: false })
    readonly videoId: string;

    @Column({ type: "varchar", nullable: false, default: "0" })
    readonly likeCount: string;

    @Column({ type: "varchar", nullable: false })
    readonly viewCount: string;

    @Column({ type: "varchar", nullable: false })
    readonly commentCount: string;

    @Column({ type: "varchar", nullable: false })
    readonly description: string;

    @Column({ type: "varchar", nullable: false })
    readonly date: string;


    // @OneToOne(() => FavoriteEntity, (favorite) => favorite.video, { onDelete: "CASCADE" })
    // readonly favorite: FavoriteEntity;

    @ManyToMany(() => FavoriteEntity, (favorite) => favorite.videos)
    favorites: FavoriteEntity[]; // Массив избранных списков


    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
};


// // Тип данных для результата
// export interface QueryResult {
//   title: string;
//   videoId: string;
//   likeCount: string;
//   viewCount: string;
//   commentCount: string;
//   description: string;
//   date: string;
// }