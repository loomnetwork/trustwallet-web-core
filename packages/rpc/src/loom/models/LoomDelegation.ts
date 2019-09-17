import 'reflect-metadata';
import { Transform, Expose } from 'class-transformer';
import BigNumber from 'bignumber.js';

export class LoomDelegation {
    @Expose({ name: 'delegator_address' })
    delegatorAddress: string;
    @Expose({ name: 'validator_address' })
    validatorAddress: string;
    @Transform(value => new BigNumber(value), { toClassOnly: true })
    shares: BigNumber;
}
