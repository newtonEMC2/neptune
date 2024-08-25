export const StoreObserver = <T, CallbackType extends Function>({ initialValue }: { initialValue: T }) => {
  let storeValue = initialValue
  const subscribers = [] as CallbackType[]

  const subscribe = (cb: CallbackType) => {
    subscribers.push(cb)
  }

  const publish = (fn: (value: T) => T) => {
    storeValue = fn(storeValue)
    subscribers.forEach(fn => fn(storeValue))
  }

  const getState = (): T => storeValue

  return { getState, subscribe, publish }
}
