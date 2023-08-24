import { env } from '$env/dynamic/private'
import Stripe from 'stripe'

export const stripe = Stripe(env.STRIPE_SECRET_KEY, {
	apiVersion: '2022-11-15'
})
