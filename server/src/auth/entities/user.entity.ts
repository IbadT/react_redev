import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import {IsNotEmpty, IsString} from 'class-validator';
import {Expose} from 'class-transformer';
import { FavoriteEntity } from 'src/favorities/entities/favority.entity';


@Entity("users")
export class UserEntity {
    @PrimaryGeneratedColumn("uuid")
    readonly id: string;

    @Column({ type: "varchar" })
    readonly login: string;

    @Column({ type: "varchar"})
    readonly password: string;

    // @OneToMany(() => FavoriteEntity, (favorite) => favorite.user_id, { cascade: true })
    // readonly favorities: FavoriteEntity[]

    @OneToMany(() => FavoriteEntity, (favorite) => favorite.user, { cascade: true })
    readonly favorites: FavoriteEntity[]; // Исправили опечатку


    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    readonly createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    readonly updatedAt: Date;
}
