import { BaseEntity } from './../../shared';

export class Customer implements BaseEntity {
    constructor(
        public id?: number,
        public firstName?: string,
        public midleName?: string,
        public secondName?: string,
        public phone?: string,
        public email?: string,
        public company?: BaseEntity,
    ) {
    }
}
