import { BaseEntity } from './../../shared';

const enum ActivityCancellationPolicy {
    'NEVER',
    'ANY_TIME',
    'HOUR_1',
    'HOUR_2',
    'HOUR_3'
}

export class Activity implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public logoContentType?: string,
        public logo?: any,
        public description?: any,
        public price?: number,
        public durationMinutes?: number,
        public preDurationMinutes?: number,
        public postDurationMinutes?: number,
        public isPrivate?: boolean,
        public colorCode?: string,
        public cancellationPolicy?: ActivityCancellationPolicy,
        public locations?: BaseEntity[],
        public categories?: BaseEntity[],
    ) {
        this.isPrivate = false;
    }
}
