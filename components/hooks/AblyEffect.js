import Ably from "ably/promises";
import { useEffect } from 'react'

const ably = new Ably.Realtime("TtF29g.PDNBlQ:CS4EJ54WHbZ-SjtAWNA3hfsBehvXLCsJmXleELc8LOQ")

export function useChannel(channelName, callbackOnMessage) {
    const channel = ably.channels.get(channelName);

    const onMount = () => {
        channel.subscribe(msg => { callbackOnMessage(msg.data); });
    }

    const onUnmount = () => {
        channel.unsubscribe();
    }

    const useEffectHook = () => {
        onMount();
        return () => { onUnmount(); };
    };

    useEffect(useEffectHook);

    return [channel, ably];
}