import { Component, OnInit } from "@angular/core";
import { SelectItem } from "primeng/primeng";
import { Message } from "../../message";
import { EmailServer } from "./emailserver";
import { EmailServerService } from "./emailserver.service";
import { EmailServerProperties } from "./emailserver.properties";
import { EmailServerPropertyValueTypeConstant } from "./emailServerPropertyValueTypeConstant";
import { EmailServerPropertiesService } from "./emailserverproperties.service";


@Component({
    templateUrl: "./emailserver.component.html"
})
export class EmailServerComponent implements OnInit {

    msgs: Message[] = [];
    emailServers: EmailServer[] = [];
    emailServerPropertiesForServer: EmailServerProperties[] = [];
    emailServerNew: EmailServer;
    emailServerUpdate: EmailServer;
    createEmailServer: boolean;
    active: boolean = true;
    active2: boolean = true;
    active3: boolean = true;
    viewEmailServer: boolean;
    updateEmailServer: boolean;
    emailServerSelected: EmailServer;
    emailServerPropertyTypes: SelectItem[];
    emailServerPropertyNew: EmailServerProperties;

    constructor(private emailServerService: EmailServerService, private emailServerPropertiesService: EmailServerPropertiesService) { }

    ngOnInit() {
        this.getAllEmailServers();
        this.loadEmailServerPropertyType();
    }

    loadEmailServerPropertyType() {
        this.emailServerPropertyTypes = [];
        this.emailServerPropertyTypes.push({ label: 'Select Type', value: null });
        this.emailServerPropertyTypes.push({ label: 'String', value: EmailServerPropertyValueTypeConstant.STRING });
        this.emailServerPropertyTypes.push({ label: 'Number', value: EmailServerPropertyValueTypeConstant.NUMBER });
        this.emailServerPropertyTypes.push({ label: 'Boolean', value: EmailServerPropertyValueTypeConstant.BOOLEAN });
    }

    onRowSelect(event: any) {
        this.emailServerSelected = event.data;
        this.emailServerPropertyNew = new EmailServerProperties();
        this.viewEmailServer = true;
        this.active = false;
        this.getAllEmailServerProperties();
        setTimeout(() => this.active = true, 0);
    }

    getAllEmailServers() {
        this.emailServerService.getAllEmailServers()
            .subscribe(emailServers => { this.emailServers = emailServers; }
            );
    }

    createEmailServerClick() {
        this.emailServerNew = new EmailServer();
        this.createEmailServer = true;
        this.emailServerPropertyNew = new EmailServerProperties();
        this.emailServerNew.emailServerProperties = [];
        this.active = false;
        setTimeout(() => this.active = true, 0);
    }

    getAllEmailServerProperties() {
        this.emailServerPropertiesService.getEmailServerPropertiesByEmailServerId(this.emailServerSelected.id)
            .subscribe(emailServers => { this.emailServerPropertiesForServer = emailServers; },
            error => {
                this.msgs.push({ severity: "error", summary: "Error while retrieving Email Server Property for server.", detail: error })
            });
    }


    createEmailServerProperty() {
        this.msgs = [];
        this.emailServerPropertiesService.createEmailServerProperty(this.emailServerPropertyNew, this.emailServerSelected.id)
            .subscribe(() => {
                this.msgs.push({ severity: "info", summary: "Email Server Property created successfully.", detail: "" });
                this.emailServerPropertyNew = new EmailServerProperties();
                this.getAllEmailServerProperties();
            },
            error => {
                this.msgs.push({ severity: "error", summary: "Email Server Property creation failed.", detail: error })
            });
    }

    deleteEmailServerProperty(emailServerProperties: EmailServerProperties) {
        this.msgs = [];
        this.emailServerPropertiesService.deleteEmailServerProperty(emailServerProperties.id)
            .subscribe(() => {
                this.msgs.push({ severity: "info", summary: "Email Server Property deleted successfully.", detail: "" });
                this.emailServerPropertyNew = new EmailServerProperties();
                this.getAllEmailServerProperties();
            },
            error => {
                this.msgs.push({ severity: "error", summary: "Email Server Property deletion failed.", detail: error })
            });
    }

    createEmailServerSubmit() {
        this.msgs = [];
        this.emailServerService.createEmailServer(this.emailServerNew)
            .subscribe(() => {
                this.msgs.push({ severity: "info", summary: "Email Server created successfully.", detail: "" });
                this.createEmailServer = false;
                this.getAllEmailServers();
            },
            error => {
                this.msgs.push({ severity: "error", summary: "Email Server creation failed.", detail: error })
            });
    }

    updateEmailServerSubmit() {
        this.emailServerService.updateEmailServerSubmit(this.emailServerSelected)
            .subscribe(emailServer => {
                this.emailServerSelected = emailServer;
                this.viewEmailServer = true;
                this.updateEmailServer = false;
                this.msgs.push({ severity: "info", summary: "Email Server updated successfully.", detail: "" });
            },
            error => {
                this.msgs.push({ severity: "error", summary: "Email Server updation failed.", detail: error })
            });
    }

    createEmailServerCancleClick() {
        this.createEmailServer = false;
        this.updateEmailServer = false;
    }

    viewEmailServerCancleClick() {
        this.viewEmailServer = false;
        this.updateEmailServer = false;
    }

    updateEmailServerClick() {
        this.updateEmailServer = true;
        this.viewEmailServer = true;
        this.emailServerUpdate = this.emailServerSelected;
        this.emailServerSelected = this.cloneContact(this.emailServerUpdate);
    }

    updateEmailServerCancel() {
        this.updateEmailServer = false;
        this.viewEmailServer = true;
        this.emailServerSelected = this.emailServerUpdate;
    }

    cloneContact(server: EmailServer): EmailServer {
        let emailServer = new EmailServer();
        for (let prop in server) {
            emailServer[prop] = server[prop];
        }
        return emailServer;
    }

    deleteEmailServerCancleClick() {
        this.msgs = [];
        this.emailServerService.deleteEmailServer(this.emailServerSelected.id)
            .subscribe(() => {
                this.msgs.push({ severity: "info", summary: "Email Server deleted successfully.", detail: "" });
                this.viewEmailServer = false;
                this.getAllEmailServers();
            },
            error => {
                this.msgs.push({ severity: "error", summary: "Email Server deletion failed.", detail: error });
            });
    }

}