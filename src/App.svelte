<script>
	import Calculator from './components/Calculator.svelte';
</script>

<main>
	<div class="calc-wrapper">
		<Calculator/>
	</div>
</main>

<style>
	.calc-wrapper{
		display: flex;
		width: 100vw;
		height: 100vh;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>