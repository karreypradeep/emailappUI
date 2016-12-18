import { EmailServerProperties } from "./emailserver.properties";

export class EmailServer {
    id: number;
    version: number;
    name: string;
    defaultServer:boolean;
    protocol: string;
    host: string;
    port: string;
    mailsPerSession: number;
    fromAddress: string;
    emailUserName: string;
    emailPassword: string;
    emailServerProperties: EmailServerProperties[];
}