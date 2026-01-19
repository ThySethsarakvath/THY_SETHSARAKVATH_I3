import { Module } from '@nestjs/common';
import { ReceiptsController } from './receipts.controller';
import { ReceiptsService } from './receipts.service';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { Receipt } from 'src/database/entities/receipts.entity';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { DatabaseModule } from 'src/database/database.module';
import { ReceiptsResolver } from './receipts.resolver';

@Module({
  imports: [
    DatabaseModule.forFeature([Receipt]),
    NotificationsModule.forFeature({
      featureName: 'receipts',
      prefix: '[RECEIPTS]',
      channels: ['log'],
    }),
  ],
  providers: [ReceiptsService, ReceiptsResolver],
  controllers: [ReceiptsController],
})
export class ReceiptsModule {}
