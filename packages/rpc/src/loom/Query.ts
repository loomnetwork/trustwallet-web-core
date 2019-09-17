export class Query {
    rpcUrl: string;

    constructor(rpcUrl: string) {
        this.rpcUrl = rpcUrl;
    }

    listDelegations = (address: string) => this.uri(`query/listdelegations?address="${address}"`);
    listUnbondDelegations = (address: string) => this.uri(`staking/delegators/${address}/unbonding_delegations`); // TODO
    getRewards = (address: string) => this.uri(`query/rewards?address="${address}"`);
    getAccount = (address: string) => this.uri(`query/getaccountinfo?address="${address}"`);
    broadcastTransaction = () => this.uri('rpc');

    private uri(path: string): string {
        return `${this.rpcUrl}/${path}`;
    }
}
