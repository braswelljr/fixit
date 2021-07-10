import React, { createContext, useState } from 'react'

export const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const [toggleSearch, setToggleSearch] = useState(false)
  const [toggleImg, setToggleImg] = useState(false)
  return (
    <ThemeContext.Provider
      value={{
        toggleSearch,
        showSearch: () => setToggleSearch(!toggleSearch),
        toggleImg,
        showImg: () => setToggleImg(!toggleImg)
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}
