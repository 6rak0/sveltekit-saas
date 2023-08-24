import { lucia } from 'lucia'
import { sveltekit } from 'lucia/middleware'
import { dev } from '$app/environment'
import { prisma } from '@lucia-auth/adapter-prisma'
import { db } from '$lib/server/prisma'

export const auth = lucia({
	adapter: prisma(db),
	env: dev ? 'DEV' : 'PROD',
	middleware: sveltekit(),
	getUserAttributes: (data) => {
		return {
			username: data.username,
			membershipId: data.membershipId,
			status: data.status,
			customerId: data.customerId
		}
	}
})

export type Auth = typeof auth
