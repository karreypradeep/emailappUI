import { EmailServer } from "./emailserver";
import { EmailServerPropertyValueTypeConstant } from "./emailServerPropertyValueTypeConstant";
export class EmailServerProperties {
    id: number;
    version: number;
    propertyName: string;
    value: string;
    emailServerPropertyValueTypeConstant: EmailServerPropertyValueTypeConstant;
}