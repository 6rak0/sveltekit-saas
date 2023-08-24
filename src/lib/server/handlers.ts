import { redirect, error } from '@sveltejs/kit'

export function authenticated(handler) {
	return async (event) => {
		const session = await await event.locals.auth.validate()

		if (!session) {
			throw redirect(303, '/login')
		}

		return handler(event)
	}
}

export function member(handler) {
	return async (event) => {
		const session = await event.locals.auth.validate()
		if (!session.user.membershipId) {
			throw error(403, 'Para acceder necesitas tener una membresía activa.')
		}

		return handler(event)
	}
}
