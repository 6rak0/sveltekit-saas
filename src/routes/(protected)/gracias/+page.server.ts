import type { PageServerLoad } from './$types'

import * as billing from '$lib/server/services/billing'

export const load: PageServerLoad = async ({ url }) => {
	const sessionId = url.searchParams.get('checkout_session_id')
	await billing.syncCheckout(sessionId)
}
