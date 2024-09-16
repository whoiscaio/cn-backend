import { Controller, Post, Delete, Body, Req } from '@nestjs/common';
import { AllocationService } from './allocation.service';
import { AllocateUserDto } from './dto/allocate-user';
import { RemoveAllocationDto } from './dto/remove-allocation';
import { Request } from 'express';

@Controller('allocations')
export class AllocationController {
  constructor(private allocationService: AllocationService) {}

  @Post()
  async allocate(@Body() allocateUserDto: AllocateUserDto, @Req() req: Request) {
    const userId = req.user?.id;
    const { unitId, shiftId } = allocateUserDto;

    return this.allocationService.allocateUser(userId, unitId, shiftId);
  }

  @Delete()
  async remove(@Body() removeAllocationDto: RemoveAllocationDto, @Req() req: Request) {
    const userId = req.user?.id;
    const { unitId, shiftId } = removeAllocationDto;

    return this.allocationService.removeUserFromUnit(userId, unitId, shiftId);
  }
}
