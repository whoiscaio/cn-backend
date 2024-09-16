import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UnitModule } from './modules/unit/unit.module';
import { AllocationModule } from './modules/allocation/allocation.module';

@Module({
  imports: [
    UserModule,
    PrismaModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    UnitModule,
    AllocationModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
