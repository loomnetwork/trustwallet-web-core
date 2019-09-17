import { Expose, Transform, Type } from 'class-transformer';
import BigNumber from 'bignumber.js';
import { Utils } from '../utils';

class LoomUnbondEntry {
    @Expose({name: 'creation_height'})
    creationHeight: string;

    @Type(() => Date)
    @Expose({name: 'completion_time'})
    completionTime: Date;

    @Transform(value => new BigNumber(value), { toClassOnly: true })
    @Expose({name: 'initial_balance'})
    initialBalance: BigNumber;

    @Transform(value => new BigNumber(value), { toClassOnly: true })
    balance: BigNumber
}

export class LoomUnbond {
    delegator_address: string;
    validator_address: string;

    @Type(() => LoomUnbondEntry)
    entries: LoomUnbondEntry[];

    getPending(): LoomUnbondEntry[] {
        return this.entries.filter(entry => entry.completionTime.getDate() > Date.now())
    }

    getPendingBalance(): BigNumber {
        return Utils.toAtom(this.getPending().reduce((acc, entry) => acc.plus(entry.balance), new BigNumber(0)))
    }
}