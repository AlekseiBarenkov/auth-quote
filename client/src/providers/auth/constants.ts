import { createContext } from 'react'
import { Nullable, User } from '../../@types'

interface AuthContext {
	user: Nullable<User>
	isLoading: boolean
}

export const AuthContext = createContext<AuthContext | undefined>(undefined)
