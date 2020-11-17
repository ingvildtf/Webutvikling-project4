import { createContext, useContext } from 'react'

export enum ActiveRecipe {
  Dark = 'Dark',
  Light = 'Light',
}

export type ActiveRecipeContextType = {
  activeRecipe: ActiveRecipe
  setActiveRecipe: (activeRecipe: ActiveRecipe) => void
}

export const ActiveRecipeContext = createContext<ActiveRecipeContextType>({
  activeRecipe: ActiveRecipe.Dark,
  setActiveRecipe: ActiveRecipe => console.warn('no theme provider'),
})
export const useActiveRecipe = () => useContext(ActiveRecipeContext)
