import { Component, OnInit } from "@angular/core";
import { ContactService } from "./contact.service";
import { Contact } from "./contact";
import { DataTable, Column, Button, Header, Footer, Dialog, SelectItem, MultiSelect, Panel, Growl} from "primeng/primeng";
import { Message } from "../../message";
import { ContactGroupService } from "../contactgroup/contactgroup.service";
import { ContactGroup } from "../contactgroup/contactgroup";
import { Group } from "../group/group";
import { GroupService } from "../group/group.service";
import { CommonService } from "../shared/common.service";
import { ContactSearchCriteria } from "../contact/contact_search_criteria";

@Component({
    selector: "my-contact",
    templateUrl: "app/contact/contact.component.html",
    styleUrls: ["app/contact/contact.component.css"],
    directives: [DataTable, Column, Button, Header, Footer, Dialog, MultiSelect, Panel, Growl]
})
export class ContactComponent implements OnInit {

    msgs: Message[] = [];
    contactSelected: Contact;
    contactNew: Contact;
    contactUpdate: Contact;
    moreGroupItems: SelectItem[];

    displayViewDialog: boolean;
    displayCreateDialog: boolean;
    updateContact: boolean;
    active: boolean = true;

    constructor(private contactService: ContactService, private groupService: GroupService, private commonService: CommonService) { }

    ngOnInit() {
        this.commonService.getAllGroups();
    }

    onSelectItemChange() {
        this.active = false;
        setTimeout(() => this.active = true, 0);
        if (this.commonService.contactSearchCriteria.groupIds !== undefined && this.commonService.contactSearchCriteria.groupIds.length <= 0) {
            this.commonService.contactSearchCriteria.groupIds = undefined;
        }
    }

    onRowSelect(event: any) {
        this.contactSelected = event.data;
        this.contactService.getContactById(this.contactSelected.id)
            .subscribe(contactFromDB => {
                this.contactSelected = contactFromDB;
                this.displayViewDialog = true;
                this.updateContact = false;
            });
    }

    viewDialogCancelClick() {
        this.displayViewDialog = false;
    }

    createContactClick() {
        this.contactNew = new Contact;
        this.displayCreateDialog = true;
        this.active = false;
        setTimeout(() => this.active = true, 0);
    }

    createDialogCancelClick() {
        this.displayCreateDialog = false;
    }

    createContactSubmit() {
        this.msgs = [];
        let contactGroups: ContactGroup[] = [];
        if (this.contactNew.groups !== undefined) {
            for (let group of this.contactNew.groups) {
                let contactGroup = new ContactGroup();
                contactGroup.group = group;
                contactGroup.active = true;
                contactGroup.unSubscribed = false;
                contactGroups.push(contactGroup);
            }
            this.contactNew.contactGroups = contactGroups;
        }
        this.contactService.createContact(this.contactNew)
            .subscribe(() => {
                //this.commonService.getAllContactsBySearchCriteria();
                this.commonService.resetContactsBySearchCriteria();
                this.commonService.groups = [];
                this.displayCreateDialog = false;
                this.msgs.push({ severity: "info", summary: "Contact created successfully.", detail: "" });
            },
            error => {
                this.msgs.push({ severity: "error", summary: "Contact creation failed.", detail: error })
            });
    }

    updateContactClick() {
        this.updateContact = true;
        this.contactUpdate = this.contactSelected;
        this.contactSelected = this.cloneContact(this.contactUpdate);
        this.moreGroupItems = [];
        this.contactSelected.moreGroups = [];
        for (let contactGroup of this.contactSelected.contactGroups) {
            contactGroup = this.cloneContactGroup(contactGroup);
            contactGroup.group = this.cloneGroup(contactGroup.group);
        }
        for (let groupItem of this.commonService.groupItems) {
            let groupFound: boolean = false;
            for (let contactGroup of this.contactSelected.contactGroups) {
                if (contactGroup.group.name === groupItem.label) {
                    groupFound = true;
                }
            }
            if (!groupFound) {
                this.moreGroupItems.push(groupItem);
            }
        }
    }

    updateContactSubmit() {
        this.msgs = [];
        let deleteContactGroups: ContactGroup[] = [];
        for (let contactGroup of this.contactSelected.contactGroups) {
            if (!contactGroup.delete) {
                deleteContactGroups.push(contactGroup);
            }
        }
        this.contactSelected.contactGroups = deleteContactGroups;
        for (let group of this.contactSelected.moreGroups) {
            let contactGroup = new ContactGroup();
            contactGroup.group = group;
            contactGroup.active = true;
            contactGroup.unSubscribed = false;
            this.contactSelected.contactGroups.push(contactGroup);
        }
        this.contactService.updateContact(this.contactSelected)
            .subscribe(contactUpdated => {
                this.contactSelected = contactUpdated;
                //this.commonService.getAllContactsBySearchCriteria();
                this.commonService.resetContactsBySearchCriteria();
                this.commonService.groups = [];
                this.displayViewDialog = true;
                this.updateContact = false;
                this.msgs.push({ severity: "info", summary: "Contact updated successfully.", detail: "" });
            },
            error => {
                this.msgs.push({ severity: "error", summary: "Contact updation failed.", detail: error })
            });
    }

    dialogUpdateCancelClick() {
        this.updateContact = false;
        this.contactSelected = this.contactUpdate;
    }

    deleteSelectedContact() {
        this.msgs = [];
        this.contactService.deleteContact(this.contactSelected.id)
            .subscribe(() => {
                //this.commonService.getAllContactsBySearchCriteria();
                this.commonService.resetContactsBySearchCriteria();
                this.commonService.groups = [];
                this.msgs.push({ severity: "info", summary: "Contact deleted successfully.", detail: "" });
                this.displayViewDialog = false;
            },
            error => {
                this.msgs.push({ severity: "error", summary: "Contact deletion failed.", detail: error });
            });
    }

    cloneContact(cont: Contact): Contact {
        let contact = new Contact();
        for (let prop in cont) {
            contact[prop] = cont[prop];
        }
        return contact;
    }

    cloneGroup(gro: Group): Group {
        let group = new Group();
        for (let prop in gro) {
            group[prop] = gro[prop];
        }
        return group;
    }

    cloneContactGroup(contGrou: ContactGroup): ContactGroup {
        let contactGroup = new ContactGroup();
        for (let prop in contGrou) {
            contactGroup[prop] = contGrou[prop];
        }
        return contactGroup;
    }

}