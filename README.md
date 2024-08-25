# NEPTUNE STORE MANAGER

## What is it?

Efficient and simple to use store manager, which enables you to create small slices to of data, accesible from anywhere in the app

## Motivation

The most decoupled react component is the one that has no props passed on. That means, we always prefer a component having 0 props if posible. To do so, we can make use of observable pattern which will contain the shared data between components.

Afterwards we realized that this could also work as a global storage manager, as it is really simple to use

## Why do you need this?

- ✅ Simplest state manager out there
- ✅ Really easy to learn
- ✅ Intuitive
- ✅ Does not depend on any other package
- ✅ Lightweight

## When you don't need this package

Do not use this package if u need:

- ❌ Large slices of state data

## Instalation

```
npm i <package-name>
```

## Usage

```
import { StoreReactWrapper } from '@newtonemc2/neptune'

interface User {
  name: string
  timesVisited: number
}

const initialValue: User[] = [
  { name: 'name1', timesVisited: 0 },
  { name: 'name2', timesVisited: 0 },
]

const { hook: useUserStore } = StoreReactWrapper<User[]>({ initialValue })

const updateUser = (previousState: User[], user: User) => {
  return previousState.map(el => {
    if (el.name === user.name) el.timesVisited += 1
    return el
  })
}

const Section = () => {
  const { state, publish } = useUserStore()
  return (
    <ul>
      {state.map(user => (
        <li style={{ display: 'flex' }}>
          <span>{user.name}</span> {'-----times visited:'}
          <span>{user.timesVisited}</span>
          <button onClick={() => publish(previousState => updateUser(previousState, user))}>visit</button>
        </li>
      ))}
    </ul>
  )
}

const Content = () => {
  const { state, publish } = useUserStore()
  return (
    <ul>
      {state.map(user => (
        <li style={{ display: 'flex' }}>
          <span>{user.name}</span> {'-----times visited:'}
          <span>{user.timesVisited}</span>
          <button onClick={() => publish(previousState => updateUser(previousState, user))}>visit</button>
        </li>
      ))}
    </ul>
  )
}

export function UsersClient() {
  return (
    <>
      <header>Header</header>
      <section>
        <Section></Section>
      </section>
      <main>
        <Content></Content>
      </main>
    </>
  )
}

```
