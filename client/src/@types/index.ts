export type User = {
	fullname: string
	email: string
}

export type Nullable<T> = T | null | undefined

export type Author = { authorId: number; name: string }
export type Quote = {
	quoteId: number
	authorId: number
	quote: string
}
