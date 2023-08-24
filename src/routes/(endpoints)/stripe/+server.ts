import { env } from '$env/dynamic/private'
import { stripe } from '$lib/server/stripe'
import { error, json } from '@sveltejs/kit'
import * as billing from '$lib/server/services/billing'

import type { RequestHandler } from './$types'

// endpoint to handle incoming webhooks
export const POST: RequestHandler = async ({ request }) => {
	// extract body
	const body = await request.text()

	// get the signature from the header
	const signature = request.headers.get('stripe-signature')

	// var to hold event data
	let event

	// verify it
	try {
		event = stripe.webhooks.constructEvent(body, signature, env.STRIPE_WEBHOOK_SECRET)
	} catch (err) {
		// signature is invalid!
		console.warn('⚠️  Webhook signature verification failed.', err.message)

		// return, because it's a bad request
		throw error(400, 'Invalid request')
	}

	const { object } = event.data

	switch (event.type) {
		case 'customer.subscription.created':
		case 'customer.subscription.updated':
		case 'customer.subscription.deleted':
		case 'customer.subscription.trial_will_end':
			await billing.syncSubscription(object.id)
			console.log(`synced subscription ${object.id}`)
			break
	}

	// return a 200 with an empty JSON response
	return json()
}
