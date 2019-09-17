import axios from 'axios';
import { plainToClass } from 'class-transformer';
import { LoomDelegation, LoomAccount, LoomBroadcastResult } from './models';
import { Query } from './Query';
import { LoomAccountResult } from './models/LoomAccount';
import { LoomUnbond } from './models/LoomUnbond';
import { LoomReward } from './models/LoomReward';
import BigNumber from 'bignumber.js';
import { Utils } from './utils';

export class LoomRPC {
    rpcUrl: string;

    constructor(rpcUrl: string) {
        this.rpcUrl = rpcUrl;
    }

    private query(): Query {
        return new Query(this.rpcUrl);
    }

    async listDelegations(address: string): Promise<LoomDelegation[]> {
        let response = await axios.get(this.query().listDelegations(address));
        return plainToClass<LoomDelegation, any[]>(LoomDelegation, response.data);
    }

    async listUnbondDelegations(address: string): Promise<LoomUnbond[]> {
        let response = await axios.get(this.query().listUnbondDelegations(address));
        return plainToClass<LoomUnbond, any[]>(LoomUnbond, response.data);
    }

    async getAccount(address: string): Promise<LoomAccount> {
        let response = await axios.get(this.query().getAccount(address));
        return plainToClass(LoomAccountResult, response.data).value;
    }

    async getRewards(address: string): Promise<BigNumber> {
        let response = await axios.get(this.query().getRewards(address));
        return Utils.toAtom(
            plainToClass<LoomReward, any[]>(LoomReward, response.data).reduce(
                (acc, reward) => acc.plus(reward.amount),
                new BigNumber(0),
            ),
        );
    }

    async broadcastTransaction(data: string): Promise<LoomBroadcastResult> {
        const url = this.query().broadcastTransaction();
        const options = {
            validateStatus: (status: number) => {
                return status >= 200 && status < 500;
            },
        };
        const response = await axios.post(url, data, options);
        return plainToClass(LoomBroadcastResult, response.data);
    }
}
