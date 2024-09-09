import { CertificateExtension } from "./certificate-extension";
import { CertificateRequestStatus } from "./certificate-request-status";

export interface CertificateRequest {
    id?: number;
    subjectEmail: string;
    subjectCommonName: string;
    subjectOrganization: string;
    subjectOrganizationUnit: string;
    subjectLocation: string;
    subjectState: string;
    subjectCountry: string;
    status: CertificateRequestStatus;
}