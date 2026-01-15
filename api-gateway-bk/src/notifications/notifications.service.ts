/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Inject, Injectable } from '@nestjs/common';
import { EVENT_PUBLISHER } from 'src/core/tokens';
import {
  NOTIFICATION_OPTIONS,
  NOTIFICATION_FEATURE_REGISTRY,
} from './constants';
import {
  NotificationFeatureOptions,
  NotificationModuleOptions,
  NotificationChannel,
} from './interface';
// import { OrdersService } from 'src/orders/orders.service';

type EventPublisher = { publish: (event: string, payload: any) => void };

@Injectable()
export class NotificationsService {
  constructor(
    @Inject(EVENT_PUBLISHER)
    private readonly publisher: EventPublisher,
    @Inject(NOTIFICATION_OPTIONS)
    private readonly options: NotificationModuleOptions,
    @Inject(NOTIFICATION_FEATURE_REGISTRY)
    private readonly features: NotificationFeatureOptions[],
  ) {}

  private getFeature(
    featureName: string,
  ): NotificationFeatureOptions | undefined {
    return this.features.find((f) => f.featureName === featureName);
  }

  private resolveChannels(
    feature?: NotificationFeatureOptions,
  ): NotificationChannel[] {
    if (!this.options.enable) return [];
    if (feature?.channels.length) return feature.channels;
    return [this.options.defaultChannel];
  }

  // notify(event: string, payload: any, message: string) {
  //   // For lab: just log
  //   // console.log(`[NOTIFY] ${event}`, payload);
  //   switch (this.options.type) {
  //     case 'email':
  //       console.log(`[EMAIL] To: ${message}`);
  //       break;
  //     case 'sms':
  //       console.log(`[SMS] To: ${message}`);
  //       break;
  //     case 'log':
  //     default:
  //       console.log(`[LOG] ${message}`);
  //   }
  //   this.publisher.publish(event, payload);
  //   return { ok: true };
  // }
  notify(featureName: string, event: string, payload: any) {
    if (!this.options.enable) {
      return { skipped: true, reason: 'notifications disabled' };
    }
    const feature = this.getFeature(featureName);
    const channels = this.resolveChannels(feature);

    const prefix = feature?.prefix ?? `[${featureName.toUpperCase()}]`;
    const messages = `${prefix} (${this.options.appName}) ${event}`;

    for (const ch of channels) {
      console.log(`[${ch.toUpperCase()}] ${messages}`, payload);
    }

    return { ok: true, channels, featureName, event };
  }
}
