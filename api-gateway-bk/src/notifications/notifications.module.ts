import { Module, DynamicModule } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
// import { CoreModule } from 'src/core/core.module';
import {
  NotificationModuleOptions,
  NotificationFeatureOptions,
} from './interface';
import {
  NOTIFICATION_OPTIONS,
  NOTIFICATION_FEATURE_OPTIONS,
} from './constants';
import { NotificationFeatureRegistrar } from './notifications.feature.registrar';
import { NotificationsRegistryModule } from './notifications-registry.module';
import { EVENT_PUBLISHER } from 'src/core/tokens';
// import { features } from 'process';

@Module({
  imports: [NotificationsRegistryModule],
})
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
      global: true, // optional
      providers: [
        { provide: NOTIFICATION_OPTIONS, useValue: options },
        {
          provide: EVENT_PUBLISHER,
          useValue: {
            publish: (event: string, payload: any) => {
              console.log(`[EVENT_PUBLISHER] ${event}`, payload);
            },
          },
        },
        NotificationsService,
      ],
      exports: [NotificationsService],
    };
  }

  static forFeature(feature: NotificationFeatureOptions): DynamicModule {
    return {
      module: NotificationsModule,
      providers: [
        { provide: NOTIFICATION_FEATURE_OPTIONS, useValue: feature },
        NotificationFeatureRegistrar,
      ],
    };
  }
}
