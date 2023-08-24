import { stripe } from '$lib/server/stripe'
import { env } from '$env/dynamic/private'
import * as users from '$lib/server/services/users'
import * as memberships from '$lib/server/services/memberships'
import type { Membership } from '@prisma/client'

function absoluteURL(path: string) {
	return new URL(path, env.DOMAIN).toString()
}

export async function createCheckout({ user }, membership: Membership) {
	const metadata = {
		userId: user.userId
	}
	return stripe.checkout.sessions.create({
		success_url: absoluteURL('/gracias?checkout_session_id={CHECKOUT_SESSION_ID}'),
		cancel_url: absoluteURL('/pricing'),
		currency: 'mxn',
		mode: 'subscription',
		//customer_email: session.email,
		client_reference_id: user.userId,
		metadata,
		subscription_data: {
			metadata
		},
		line_items: [
			{
				price: membership.priceId,
				quantity: 1
			}
		]
	})
}

export async function syncCheckout(sessionId: string) {
	const checkout = await stripe.checkout.sessions.retrieve(sessionId)
	return syncSubscription(checkout.subscription)
}

export async function syncSubscription(subscriptionId: string) {
	const subscription = await stripe.subscriptions.retrieve(subscriptionId)
	const { userId } = subscription.metadata
	const item = subscription.items.data[0]
	const priceId = item.price.id
	const membership = await memberships.getBy({ priceId })

	await users.update(userId, {
		customerId: subscription.customer,
		subscriptionId: subscription.id,
		status: subscription.status.toUpperCase(),
		membershipId: membership?.id
	})
}

export async function createPortalSession({ customerId }) {
	return stripe.billingPortal.sessions.create({
		customer: customerId,
		return_url: absoluteURL('/pricing')
	})
}
