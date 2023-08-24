import { redirect } from '@sveltejs/kit'
import { member } from '$lib/server/handlers'
import * as billing from '$lib/server/services/billing'

import type { PageServerLoad } from './$types'

export const GET: PageServerLoad = member(async ({ locals }) => {
	const session = await locals.auth.validate()

	const billingSession = await billing.createPortalSession(session.user)

	throw redirect(303, billingSession.url)
})
