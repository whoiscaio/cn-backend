import { IsNotEmpty } from 'class-validator';

export class AllocateUserDto {
  @IsNotEmpty()
  shiftId: number;

  @IsNotEmpty()
  unitId: number;
}
