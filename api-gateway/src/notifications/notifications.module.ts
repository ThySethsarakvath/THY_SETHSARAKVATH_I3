import { Module, DynamicModule } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
// import { CoreModule } from 'src/core/core.module';
import {
  NotificationModuleOptions,
  NotificationFeatureOptions,
} from './interface';
import { NOTIFICATION_OPTIONS, NOTIFICATION_FEATURE } from './constants';
// import { features } from 'process';

@Module({})
export class NotificationsModule {
  // static register(options: NotificationModuleOptions): DynamicModule {
  //   return {
  //     module: NotificationsModule,
  //     imports: [CoreModule],
  //     providers: [
  //       {
  //         provide: 'NOTIFICATION_OPTIONS',
  //         useValue: options,
  //       },
  //       NotificationsService,
  //     ],
  //     exports: [NotificationsService],
  //   };
  // }
  static forRoot(options: NotificationModuleOptions): DynamicModule {
    return {
      module: NotificationsModule,
      providers: [
        {
          provide: NOTIFICATION_OPTIONS,
          useValue: options,
        },
        {
          provide: NOTIFICATION_FEATURE,
          useValue: [] as NotificationFeatureOptions[],
        },
        NotificationsService,
      ],
      exports: [NotificationsService],
      global: true,
    };
  }

  static forFeature(feature: NotificationFeatureOptions): DynamicModule {
    return {
      module: NotificationsModule,
      providers: [
        {
          provide: NOTIFICATION_FEATURE,
          useFactory: (features: NotificationFeatureOptions[]) => {
            return [...features, feature];
          },
          inject: [NOTIFICATION_FEATURE],
        },
      ],
    };
  }
}
