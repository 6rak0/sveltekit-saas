import { db } from '$lib/server/prisma'

await db.membership.create({
	data: {
		name: 'Membresía Individual',
		handle: 'individual',
		price: 99900,
		priceId: 'price_1NV0FoFex0hRfBNJEKai0SD4'
	}
})
await db.membership.create({
	data: {
		name: 'Membresía Individual Trimestral',
		handle: 'individual_trimestral',
		price: 225000,
		priceId: 'price_1NVglpFex0hRfBNJsZJqZ5dr'
	}
})
await db.membership.create({
	data: {
		name: 'Membresía Individual Anual',
		handle: 'individual_anual',
		price: 899900,
		priceId: 'price_1NV0LNFex0hRfBNJtNrmavag'
	}
})
await db.membership.create({
	data: {
		name: 'Membresía Pareja',
		handle: 'pareja',
		price: 225000,
		priceId: 'price_1NV0MdFex0hRfBNJAAst5v1j'
	}
})
