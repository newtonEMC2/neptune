import { StoreObserver } from '../StoreObserver'

describe('StoreObserver', () => {
  describe('When value is a primitive', () => {
    it('should increment the store value when publish is called, independently of having subscribers or not', () => {
      const increment = (value: number): number => value + 1
      const store = StoreObserver<number, typeof increment>({
        initialValue: 0,
      })
      store.publish(state => state + 1)
      store.publish(state => state + 1)
      expect(store.getState()).toBe(2)
    })
    it('should call all subscribers with the store value when publish is called', () => {
      const mockFn = jest.fn()
      const store = StoreObserver<number, typeof mockFn>({
        initialValue: 0,
      })
      store.subscribe(mockFn)
      store.publish(state => state + 1)
      expect(mockFn).toHaveBeenCalledTimes(1)
      expect(mockFn).toHaveBeenLastCalledWith(1)
    })
  })
  describe('When value is a reference', () => {
    const users = [
      { name: 'user1', age: 18 },
      { name: 'user2', age: 30 },
    ]
    type Users = typeof users
    it('should increment the value by one', () => {
      const incrementAgeByOne = (users: Users, id: string) => {
        return users.map(user => {
          if (user.name === id) user.age += 1
          return user
        })
      }
      const store = StoreObserver<Users, typeof incrementAgeByOne>({
        initialValue: users,
      })
      store.publish(users => incrementAgeByOne(users, 'user1'))
      expect(store.getState()).toEqual([
        { name: 'user1', age: 19 },
        { name: 'user2', age: 30 },
      ])
    })
  })
})
