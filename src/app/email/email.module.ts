import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { GroupComponent } from './group/group.component';
import { GroupService } from './group/group.service';
import { CommonService } from './shared/common.service';
import { ContactService } from './contact/contact.service';
import { DataTableModule, SharedModule, GrowlModule, Message, ButtonModule} from 'primeng/primeng';

@NgModule({
    imports: [CommonModule, FormsModule, HttpModule, JsonpModule, MaterialModule.forRoot(), DataTableModule, ButtonModule, SharedModule, GrowlModule],
    declarations: [GroupComponent],
    providers: [ContactService, GroupService, CommonService]
})
export class EmailModule { }