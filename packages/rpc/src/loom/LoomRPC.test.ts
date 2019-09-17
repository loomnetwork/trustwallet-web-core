import axios from 'axios';
import { getEnv } from '../utils';
import { LoomRPC } from './LoomRPC';

describe('LoomRPC', () => {
    let rpc: LoomRPC;
    const address = 'Loom1lcgtmf3gkdq4cuelly6554znqqhsl6eqy4r3f5';
    const delegationAddress = 'Loom1vjrx0lks65yefnsz4xk92vugda2z25esym5ypp';
    const delegator = 'Loom1xcn6f52mall95cw798qgftsvxvqrrdj535t8pm';

    beforeEach(function() {
        require('dotenv').config({ path: __dirname + '/./.env' });
        rpc = new LoomRPC(getEnv('Loom_RPC_URL'));
    });

    it('should get account', async () => {
        spyOn(axios, 'get').and.returnValue({ data: '' });
        spyOn(axios, 'post').and.returnValue({ data: '' });

        const addToBeCalled = `${getEnv('Loom_RPC_URL')}/auth/accounts/${address}`;
        await rpc.getAccount(address);
        expect(axios.get).toHaveBeenCalledWith(addToBeCalled);
    });

    it('should list delegations', async () => {
        spyOn(axios, 'get').and.returnValue({ data: '' });
        spyOn(axios, 'post').and.returnValue({ data: '' });

        await rpc.listDelegations(delegationAddress);
        const toBeCalled = `${getEnv('Loom_RPC_URL')}/staking/delegators/${delegationAddress}/delegations`;
        expect(axios.get).toHaveBeenCalledWith(toBeCalled);
    });

    it('should list unbonding delegations', async () => {
        spyOn(axios, 'get').and.returnValue({ data: '' });
        spyOn(axios, 'post').and.returnValue({ data: '' });

        await rpc.listUnbondDelegations(delegator);
        const toBeCalled = `${getEnv('Loom_RPC_URL')}/staking/delegators/${delegator}/unbonding_delegations`;
        expect(axios.get).toHaveBeenCalledWith(toBeCalled);
    });

    it('should list get rewards', async () => {
        spyOn(axios, 'get').and.returnValue({ data: [] });
        spyOn(axios, 'post').and.returnValue({ data: '' });
        await rpc.getRewards(delegator);
        const toBeCalled = `${getEnv('Loom_RPC_URL')}/distribution/delegators/${delegator}/rewards`;
        expect(axios.get).toHaveBeenCalledWith(toBeCalled);
    });

    it('should broadcast transaction', async () => {
        spyOn(axios, 'get').and.returnValue({ data: '' });
        spyOn(axios, 'post').and.returnValue({ data: '' });
        const data =
            '{"tx":{"memo":"","signatures":[{"pub_key":{"type":"tendermint\\/PubKeySecp256k1","value":"ApGCXwby9foj0IAqOYvmjI+Sd2qdGVdyI1h+CiIFY8xF"},"signature":"5je8nZG5k3Qel1LeJ8f0QAZjwaeRK5Uw\\/DOaPHE64MBCAqYYZCO5l\\/mkxLSzQyxJABk14m+gzCNpSNHiWQm84w=="}],"msg":[{"type":"Loom-sdk\\/MsgSend","value":{"amount":[{"amount":"2241155","denom":"uatom"}],"from_address":"Loom135qla4294zxarqhhgxsx0sw56yssa3z0f78pm0","to_address":"Loom1suasadhn8wmueg93u6js8ala89azqwg6fswuln"}}],"type":"Loom-sdk\\/MsgSend","fee":{"amount":[{"amount":"1000","denom":"uatom"}],"gas":"200000"}},"mode":"async"}';
        await rpc.broadcastTransaction(data);
        expect(axios.post).toHaveBeenCalled();
    });
});
