import { IsNotEmpty } from "class-validator";

export class CreateAudit {
    @IsNotEmpty()
    url: string;

    @IsNotEmpty()
    siteName: string;

    structureName: string;

    nameAuditor: string;

    @IsNotEmpty()
    emailAuditor: string;

    @IsNotEmpty()
    renderEmail: boolean;
}