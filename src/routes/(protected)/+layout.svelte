<header>
	<h1>saas</h1>
	<nav>
		<a href="/">home</a>
		<a href="/pricing">membresías</a>
		<a href="/dashboard">dashboard</a>
		<a href="/billing">billing</a>
		<a href="/logout">cierra sesión</a>
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
