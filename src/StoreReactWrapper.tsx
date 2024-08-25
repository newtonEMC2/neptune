import { useEffect, useState } from 'react'
import { StoreObserver } from './StoreObserver'

export const StoreReactWrapper = <T,>({ initialValue }: { initialValue: T }) => {
  let Store = StoreObserver<T, React.Dispatch<React.SetStateAction<T>>>({
    initialValue,
  })

  const hook = () => {
    const [state, setState] = useState(initialValue)
    useEffect(() => {
      Store.subscribe(setState)
    }, [])

    return { state, publish: Store.publish }
  }

  return { hook, getState: Store.getState }
}
