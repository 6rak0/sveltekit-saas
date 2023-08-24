import { db } from '../prisma'

export function all() {
	return db.membership.findMany({
		orderBy: [{ price: 'asc' }]
	})
}

export function get(id) {
	return getBy({ id })
}

export function getBy(where) {
	return db.membership.findUnique({ where })
}
