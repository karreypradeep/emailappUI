import { Component, OnInit } from "@angular/core";
import { ContactGroupService } from "./contactgroup.service";
import { ContactGroup } from "./contactgroup";
import { AuthorizationService } from '../../core/authorization.service';

@Component({
    templateUrl: "app/contactgroup/contactgroup.component.html"
})
export class ContactGroupComponent implements OnInit {

    contactGroups: ContactGroup[];
    errorMessage: string;

    constructor(private contactGroupService: ContactGroupService,private authorizationService : AuthorizationService) { }

    ngOnInit() {
        this.getAllContactGroups();
    }

    getAllContactGroups() {
        this.contactGroupService.getAllContactGroups()
            .subscribe(
            contactGroups => this.contactGroups = contactGroups,
            error => this.errorMessage = <any>error
            );
    }

}