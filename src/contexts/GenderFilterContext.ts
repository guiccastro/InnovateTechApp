import React from "react"

interface GenderFilterContextType {
    genderFilter: string
    setGenderFilter: React.Dispatch<React.SetStateAction<string>>
}

const DEFAULT_VALUE = {
    genderFilter: "",
    setGenderFilter: () => {}
}

const GenderFilterContext = React.createContext<GenderFilterContextType>(DEFAULT_VALUE)

export default GenderFilterContext
