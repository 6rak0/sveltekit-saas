import { error, redirect } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { authenticated } from '$lib/server/handlers'

import * as billing from '$lib/server/services/billing'
import * as memberships from '$lib/server/services/memberships'

export const GET: RequestHandler = authenticated(async ({ locals, url }) => {
	const session = await locals.auth.validate()
	if (session?.membershipId) {
		throw error(400, 'El usuario ya tiene una membresía')
	}

	const handle = url.searchParams.get('membership')
	const membership = await memberships.getBy({ handle })

	const checkout = await billing.createCheckout(session, membership)

	throw redirect(303, checkout.url)
})
