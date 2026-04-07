declare module 'xmldom';

declare module 'node-fetch' {
    export default function fetch(url: string, init?: unknown): Promise<NodeFetchResponse>;
    export interface NodeFetchResponse {
        json(): Promise<unknown>;
    }
}
