import { IsNotEmpty } from 'class-validator';

export class AllocateUserDto {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  shiftId: number;

  @IsNotEmpty()
  unitId: number;
}
