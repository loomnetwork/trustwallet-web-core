import { LoomRPC } from './LoomRPC';
import { getEnv } from '../utils';

describe('LoomRPC', () => {
    let rpc: LoomRPC;
    let address: string;
    let delegationAddress: string;
    let delegator: string;

    beforeAll(() => {
        require('dotenv').config({ path: __dirname + '/./.env' });
        rpc = new LoomRPC(getEnv('Loom_RPC_URL'));
        address = 'Loom1lcgtmf3gkdq4cuelly6554znqqhsl6eqy4r3f5';
        delegationAddress = 'Loom1vjrx0lks65yefnsz4xk92vugda2z25esym5ypp';
        delegator = 'Loom1xcn6f52mall95cw798qgftsvxvqrrdj535t8pm';
    });

    it('should get account', async () => {
        let account = await rpc.getAccount(address);
        expect(account.address).toBe(address);
    }, 100000);

    it('should list delegations', async () => {
        let delegations = await rpc.listDelegations(delegationAddress);
        expect(delegations.length).toBeTruthy();
    });

    it('should list unbonding delegations', async () => {
        let delegations = await rpc.listUnbondDelegations(delegator);
        expect(delegations.length).toBeTruthy();
    });

    it('should list get rewards', async () => {
        let reward = await rpc.getRewards(delegator);
        expect(reward.toNumber()).toBeGreaterThan(0.0);
    });

    it('should broadcast transaction', async () => {
        let data =
            '{"tx":{"memo":"","signatures":[{"pub_key":{"type":"tendermint\\/PubKeySecp256k1","value":"ApGCXwby9foj0IAqOYvmjI+Sd2qdGVdyI1h+CiIFY8xF"},"signature":"5je8nZG5k3Qel1LeJ8f0QAZjwaeRK5Uw\\/DOaPHE64MBCAqYYZCO5l\\/mkxLSzQyxJABk14m+gzCNpSNHiWQm84w=="}],"msg":[{"type":"Loom-sdk\\/MsgSend","value":{"amount":[{"amount":"2241155","denom":"uatom"}],"from_address":"Loom135qla4294zxarqhhgxsx0sw56yssa3z0f78pm0","to_address":"Loom1suasadhn8wmueg93u6js8ala89azqwg6fswuln"}}],"type":"Loom-sdk\\/MsgSend","fee":{"amount":[{"amount":"1000","denom":"uatom"}],"gas":"200000"}},"mode":"async"}';
        let result = await rpc.broadcastTransaction(data);
        expect(result.txhash).toBeDefined();
    });
});
