import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

import * as memberships from '$lib/server/services/memberships'

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate()
	if (!session) throw redirect(302, '/login')
	const records = memberships.all()
	return {
		memberships: records
	}
}
