import { Controller, Get } from '@nestjs/common';
import { UnitService } from './unit.service';

@Controller('units')
export class UnitController {
  constructor(private unitService: UnitService) {}

  @Get()
  async index() {
    return this.unitService.findAll();
  }
}
