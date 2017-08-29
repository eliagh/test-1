import { BaseEntity } from './../../shared';

const enum ItemUnit {
    'PIECE',
    'G',
    'KG',
    'LITER'
}

export class Item implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public pricePerUnit?: number,
        public unit?: ItemUnit,
        public code?: any,
        public description?: any,
        public company?: BaseEntity,
    ) {
    }
}
