import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  Dispatch,
  useReducer,
} from 'react'
import { useFrame } from 'react-three-fiber'
import { NaiveBroadphase, World, Body } from 'cannon'
import { IGameState } from './provider/store/game-state'
import { TReducerAction, reducers } from './provider/store/reducers'
import { intialState } from './provider/store/init'

export type TGameDispatch = Dispatch<TReducerAction>

export interface IGameContextProvider {
  initState?: IGameState
}
// Cannon-world context provider
const context = React.createContext<
  {
    state: IGameState
    dispatch: TGameDispatch,
    world?: World
  }
>({ state: intialState(), dispatch: () => undefined })

export function Provider({ children, initState = intialState() }: any) {
  // Set up physics
  const [world] = useState(() => new World())
  const [state, dispatch] = useReducer(reducers, initState)

  useEffect(() => {
    world.broadphase = new NaiveBroadphase()
    world.solver.iterations = 10
    world.gravity.set(0, 0, -25)
  }, [world])

  // Run world stepper every frame
  useFrame(() => world.step(1 / 60))
  // Distribute world via context
  return (
    <context.Provider
      value={{world, state, dispatch}}
      children={children}
    />
  )
}

// Custom hook to maintain a world physics body
export function useCannon(
  { ...props },
  fn: any,
  deps = []
): { ref: any; body: Body } {
  const ref: any = useRef()
  // Get cannon world object
  const { world } = useGameContext()
  // Instanciate a physics body
  const [body] = useState(() => new Body(props))
  useEffect(() => {
    // Call function so the user can add shapes
    fn(body)
    // Add body to world on mount
    world?.addBody(body)
    // Remove body on unmount
    return () => world?.remove(body)
  }, deps)

  useFrame(() => {
    if (ref.current) {
      // Transport cannon physics into the referenced threejs object
      ref.current.position.copy(body.position)
      ref.current.quaternion.copy(body.quaternion)
    }
  })

  return { ref, body }
}

export const useGameContext = () => useContext(context)
