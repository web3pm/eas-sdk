import { Signer } from 'ethers';
import { EAS } from '../eas';
import { DomainTypedData, EIP712MessageTypes, EIP712Params, EIP712Response, EIP712Types, PartialTypedDataConfig, TypedDataHandler } from './typed-data-handler';
export { EIP712Request, PartialTypedDataConfig, EIP712MessageTypes } from './typed-data-handler';
export interface OffchainAttestationType extends EIP712Types<EIP712MessageTypes> {
    domain: string;
}
export declare enum OffchainAttestationVersion {
    Legacy = 0,
    Version1 = 1,
    Version2 = 2
}
export declare const OFFCHAIN_ATTESTATION_TYPES: Record<OffchainAttestationVersion, OffchainAttestationType[]>;
export type OffchainAttestationParams = {
    schema: string;
    recipient: string;
    time: bigint;
    expirationTime: bigint;
    revocable: boolean;
    refUID: string;
    data: string;
    salt?: string;
} & Partial<EIP712Params>;
export type OffchainAttestationTypedData = OffchainAttestationParams & {
    version: OffchainAttestationVersion;
};
export type OffchainAttestationOptions = {
    salt?: string;
    verifyOnchain: boolean;
};
export interface SignedOffchainAttestation extends EIP712Response<EIP712MessageTypes, OffchainAttestationTypedData> {
    version: OffchainAttestationVersion;
    uid: string;
}
export declare const SALT_SIZE = 32;
export declare class Offchain extends TypedDataHandler {
    readonly version: OffchainAttestationVersion;
    protected signingType: OffchainAttestationType;
    protected readonly verificationTypes: OffchainAttestationType[];
    private readonly eas;
    constructor(config: PartialTypedDataConfig, version: OffchainAttestationVersion, eas: EAS);
    getDomainSeparator(): string;
    getDomainTypedData(): DomainTypedData;
    signOffchainAttestation(params: OffchainAttestationParams, signer: Signer, options?: OffchainAttestationOptions): Promise<SignedOffchainAttestation>;
    verifyOffchainAttestationSignature(attester: string, attestation: SignedOffchainAttestation): boolean;
    private getOffchainUID;
    static getOffchainUID(version: OffchainAttestationVersion, attestation: SignedOffchainAttestation): string;
}
