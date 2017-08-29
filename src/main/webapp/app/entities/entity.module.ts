import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { TestCompanyModule } from './company/company.module';
import { TestLocationModule } from './location/location.module';
import { TestItemModule } from './item/item.module';
import { TestInventoryModule } from './inventory/inventory.module';
import { TestCategoryModule } from './category/category.module';
import { TestActivityModule } from './activity/activity.module';
import { TestAppointmentModule } from './appointment/appointment.module';
import { TestCustomerModule } from './customer/customer.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        TestCompanyModule,
        TestLocationModule,
        TestItemModule,
        TestInventoryModule,
        TestCategoryModule,
        TestActivityModule,
        TestAppointmentModule,
        TestCustomerModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TestEntityModule {}
