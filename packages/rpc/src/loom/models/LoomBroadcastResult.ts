export class LoomBroadcastResult {
    txhash?: string;
    height?: number;
    error?: string;

    get isError(): boolean {
        return this.error !== undefined;
    }
}
