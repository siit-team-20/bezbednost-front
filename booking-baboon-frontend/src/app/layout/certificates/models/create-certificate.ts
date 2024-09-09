import { X500Name } from "./x500-name";

export interface CreateCertificate {
    certificateType: string,
    alias: string,
    subject: X500Name,
    domain: string | null
}