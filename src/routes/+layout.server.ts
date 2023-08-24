import * as membership from '$lib/server/services/memberships'

import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate()
	if (session?.user.membershipId) {
		session.user.membership = await membership.get(session.user.membershipId)
	}
	return {
		session
	}
}
