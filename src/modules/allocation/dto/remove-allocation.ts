import { PartialType } from '@nestjs/mapped-types';
import { AllocateUserDto } from './allocate-user';

export class RemoveAllocationDto extends PartialType(AllocateUserDto) {}
