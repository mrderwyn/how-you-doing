type methodType<K, V> = (key: K) => Promise<V>;

const createCachedAsyncMethod = <K, V>(method: methodType<K, V>) => {
    const cache = new Map<K, Promise<V>>();
    return async (key: K) => {
        let result = cache.get(key);
        if (!result) {
            const methodReturn = await method(key);
            const resultValue = Promise.resolve(methodReturn);
            cache.set(key, resultValue);
            result = resultValue;
        }
    
        return result;
    }
}

export default createCachedAsyncMethod;