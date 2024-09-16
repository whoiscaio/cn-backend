import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UnitService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.unit.findMany({
      include: {
        Shifts: true,
        Allocations: true,
      },
    });
  }
}
