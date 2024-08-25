import { StoreReactWrapper } from '../StoreReactWrapper'
import { act, fireEvent, render, screen, within } from '@testing-library/react'

const Counter = ({ initialValue = 0, ariaLabel = 'counter' }) => {
  const { hook: useCounterStore } = StoreReactWrapper<number>({
    initialValue,
  })
  const { publish, state } = useCounterStore()

  return (
    <div aria-label={ariaLabel}>
      <button onClick={() => publish(count => count + 1)}>increase</button>
      <div>value: {state}</div>
    </div>
  )
}

const UsersList = () => {
  const users = [
    { name: 'user1', age: 18 },
    { name: 'user2', age: 30 },
  ]
  const { hook: useUsersStore } = StoreReactWrapper<typeof users>({
    initialValue: users,
  })
  const { publish, state } = useUsersStore()

  const increaseAgeByOne = (internalState: typeof users, id: string) => {
    return internalState.map(user => {
      if (user.name === id) user.age += 1
      return user
    })
  }

  return (
    <ul>
      {state.map(user => (
        <li onClick={() => publish(internalState => increaseAgeByOne(internalState, user.name))} key={user.name}>
          {user.name}-{user.age}
        </li>
      ))}
    </ul>
  )
}

describe('Store', () => {
  describe('When value is a primitive', () => {
    it('should have initial value of 0', () => {
      render(<Counter></Counter>)
      expect(screen.getByText('value: 0')).toBeInTheDocument()
    })
    it('should have value of 2 after increasing twice', () => {
      render(<Counter></Counter>)
      const button = screen.getByRole('button', { name: 'increase' })
      act(() => {
        fireEvent.click(button)
        fireEvent.click(button)
      })
      expect(screen.getByText('value: 2')).toBeInTheDocument()
    })
  })
  describe('when value is a reference', () => {
    it('should have initial value of initial users value', () => {
      render(<UsersList></UsersList>)
      expect(screen.getByText('user1-18')).toBeInTheDocument()
      expect(screen.getByText('user2-30')).toBeInTheDocument()
    })
    it('should have value of 20 after increasing age twice', () => {
      render(<UsersList></UsersList>)
      const listItem = screen.getAllByRole('listitem')[0]
      act(() => {
        fireEvent.click(listItem)
        fireEvent.click(listItem)
      })
      expect(screen.getByText('user1-20')).toBeInTheDocument()
      expect(screen.getByText('user2-30')).toBeInTheDocument()
    })
  })
  describe('When there are multiple stores', () => {
    it('should keep own values on each stores', () => {
      render(
        <>
          <Counter ariaLabel="counter1"></Counter>
          <Counter ariaLabel="counter2" initialValue={100}></Counter>
        </>
      )
      const counter1 = within(screen.getByLabelText('counter1')).getByRole('button', { name: 'increase' })
      const counter2 = within(screen.getByLabelText('counter2')).getByRole('button', { name: 'increase' })
      act(() => {
        fireEvent.click(counter1)
        fireEvent.click(counter1)
        fireEvent.click(counter1)
        fireEvent.click(counter2)
        fireEvent.click(counter2)
      })

      expect(screen.getByText('value: 3')).toBeInTheDocument()
      expect(screen.getByText('value: 102')).toBeInTheDocument()
    })
  })
})
