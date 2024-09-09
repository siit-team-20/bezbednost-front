import { X500Name } from "./x500-name";

export interface Certificate {
    serialNumber: string,
    signatureAlgorithm: string,
    issuer: X500Name,
    startDate: Date,
    endDate: Date,
    subject: X500Name,
    extensions: string[],
    endEntity: boolean,
    root: boolean,
    children: Certificate[],
}