<script lang="ts">
	import type { PageData } from './$types'
	export let data: PageData
</script>

<h1>tipos de membresía</h1>

<section>
	{#each data.memberships as membership}
		<article>
			<h2>{membership.name}</h2>
			<p>{(membership.price / 100).toLocaleString('mx', { style: 'currency', currency: 'mxn' })}</p>
			<a href="/checkout?membership={membership.handle}">suscríbete</a>
		</article>
	{/each}
</section>
