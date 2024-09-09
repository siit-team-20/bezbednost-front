import { CertificateExtension } from "./certifacte.extension";
import { Subject } from "./subject";

export interface Certificate {
    alias: string;
    subject: Subject;
    startDate: string;
    endDate: string;
    extensions: CertificateExtension[]; 
    
}