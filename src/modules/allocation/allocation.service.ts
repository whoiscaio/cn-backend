import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AllocationService {
  constructor(private prisma: PrismaService) {}
  async allocateUser(userId: number, unitId: number, shiftId: number) {
    const unit = await this.prisma.unit.findUnique({
      where: { id: unitId },
      include: { Shifts: true, Allocations: true },
    });

    const allowedShifts = unit?.Shifts.map(shift => shift.id);
    const shiftAllocations = unit?.Allocations.filter(allocation => allocation.shiftId === shiftId).map(allocation => allocation.userId);

    if (shiftAllocations.some(allocationId => allocationId === userId)) {
      throw new HttpException("You already enrolled for this shift.", HttpStatus.BAD_REQUEST);
    }

    if (!allowedShifts?.includes(shiftId)) {
      throw new HttpException("This unit does not support this shift.", HttpStatus.BAD_REQUEST);
    }

    // Create the allocation
    return this.prisma.allocation.create({
      data: {
        userId,
        unitId,
        shiftId,
      },
    });
  }

  async removeUserFromUnit(userId: number, unitId: number, shiftId: number) {
    return this.prisma.allocation.delete({
      where: {
        userId_unitId_shiftId: {
          userId,
          unitId,
          shiftId,
        },
      },
    });
  }
}
