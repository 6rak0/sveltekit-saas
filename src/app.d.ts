// See https://kit.svelte.dev/docs/types#app

import type { Membership, SubscriptionStatus } from '@prisma/client'

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			auth: import('lucia').AuthRequest
		}
		// interface PageData {}
		// interface Platform {}
	}
}
/// <reference types="lucia" />
declare global {
	namespace Lucia {
		type Auth = import('$lib/server/lucia').Auth
		type DatabaseUserAttributes = {
			username: string
			membershipId: Int
			membership: Membership
			customerId: string
			subscriptionId: string
			status: SubscriptionStatus
		}
		type DatabaseSessionAttributes = { object }
	}
}

export {}
