<script>import "../app.pcss";</script><main>
	<slot></slot>
</main>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		overflow: hidden;
		height: 100vh;
		width: 100vw;
	}
	main {
		height: 100vh;
		width: 100vw;
	}
</style>
