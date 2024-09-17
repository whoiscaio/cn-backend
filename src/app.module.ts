import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UnitModule } from './modules/unit/unit.module';
import { AllocationModule } from './modules/allocation/allocation.module';
import { AuthMiddleware } from './modules/middlewares/auth.middleware';
import { AllocationController } from './modules/allocation/allocation.controller';
import { UnitController } from './modules/unit/unit.controller';

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
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(AllocationController, UnitController)
  }
}
