import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { GroupComponent } from './group/group.component';
import { ContactComponent } from './contact/contact.component';
import { EmailComponent } from './email/email.component';
import { EmailServerComponent } from './server/emailserver.component';
import { GroupService } from './group/group.service';
import { CommonService } from './shared/common.service';
import { ContactService } from './contact/contact.service';
import { ContactGroupService } from './contactgroup/contactgroup.service';
import { EmailServerService } from "./server/emailserver.service";
import { EmailService } from "./email/email.service";
import { DataTableModule, SharedModule, GrowlModule, Message, 
         ButtonModule, Header, Footer, DialogModule, SelectItem,
         PanelModule, MultiSelectModule, ListboxModule, TabViewModule, DropdownModule} from 'primeng/primeng';

@NgModule({
    imports: [CommonModule, FormsModule, HttpModule, JsonpModule, MaterialModule.forRoot(), DataTableModule, ButtonModule, 
    DialogModule, PanelModule, SharedModule, GrowlModule, MultiSelectModule, ListboxModule, TabViewModule, DropdownModule],
    declarations: [GroupComponent, ContactComponent, EmailServerComponent, EmailComponent],
    providers: [ContactService, GroupService, CommonService, ContactGroupService, EmailServerService, EmailService]
})
export class EmailModule { }