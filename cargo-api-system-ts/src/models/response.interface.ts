export const ResponseData = (data: any) => {
	return {
		data
	}
}

export const ResponseErrors = (errors: Array<any>) => {
	return {
		errors
	}
}

export const Error = (code: string, message: string) => {
	return {
		"error": {
			code,
			message
		}
	}
}