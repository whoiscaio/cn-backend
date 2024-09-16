import { Controller, Post, Delete, Body } from '@nestjs/common';
import { AllocationService } from './allocation.service';
import { AllocateUserDto } from './dto/allocate-user';
import { RemoveAllocationDto } from './dto/remove-allocation';
import { UnitService } from '../unit/unit.service';

@Controller('allocations')
export class AllocationController {
  constructor(private allocationService: AllocationService) {}

  @Post()
  async allocate(@Body() allocateUserDto: AllocateUserDto) {
    const { userId, unitId, shiftId } = allocateUserDto;

    return this.allocationService.allocateUser(userId, unitId, shiftId);
  }

  @Delete()
  async remove(@Body() removeAllocationDto: RemoveAllocationDto) {
    const { userId, unitId, shiftId } = removeAllocationDto;

    return this.allocationService.removeUserFromUnit(userId, unitId, shiftId);
  }
}
