import {
    get,
    writable
} from 'svelte/store';
import type { Writable } from 'svelte/store';
import type { ActorDetails } from './ActorDetails';
import { browser } from '$app/env';

export const actorInput = writable('');
export const actorInputDeleteFlag = writable(true);
export const actors = writable<ActorDetails[]>([]);

const storage = <T>(key: string, initValue: T): Writable<T> => {
    const store = writable(initValue);
    if (!browser) return store;

    const storedValueStr = localStorage.getItem(key);
    if (storedValueStr != null) store.set(JSON.parse(storedValueStr));

    store.subscribe((val) => {
        if (val === null || val === undefined) {
            localStorage.removeItem(key);
        } else {
            localStorage.setItem(key, JSON.stringify(val));
        }
        // if ([null, undefined].includes(val)) {
        //     localStorage.removeItem(key);
        // } else {
        //     localStorage.setItem(key, JSON.stringify(val));
        // }
    });

    window.addEventListener('storage', () => {
        const storedValueStr = localStorage.getItem(key);
        if (storedValueStr == null) return;

        const localValue: T = JSON.parse(storedValueStr);
        if (localValue !== get(store)) store.set(localValue);
    });
    return store;
}

export default storage;