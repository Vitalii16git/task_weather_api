import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'weather_table' })
export class WeatherEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: 'decimal', precision: 10, scale: 7, nullable: false })
  lat: number;

  @ApiProperty()
  @Column({ type: 'decimal', precision: 10, scale: 7, nullable: false })
  lon: number;

  @ApiProperty()
  @Column({ type: 'varchar' })
  timezone: string;

  @ApiProperty()
  @Column({ type: 'integer' })
  timezone_offset: number;

  @ApiProperty()
  @Column({ type: 'jsonb' })
  current: any;
}
