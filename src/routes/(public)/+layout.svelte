<header>
	<h1>saas</h1>
	<nav>
		<a href="/">home</a>
		<a href="/pricing">membresías</a>
		<a href="/login">inicia sesión</a>
	</nav>
</header>

<main>
	<slot />
</main>

<style>
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
