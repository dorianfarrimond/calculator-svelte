<script>
    import { createEventDispatcher } from 'svelte';

	let activeKey = '';
	import Button from './Button.svelte';

	const dispatch = createEventDispatcher();

	function allClear() {
		dispatch('clear');
    }

    function handleOperator(operator) {
		dispatch('operator', operator)
    }

    function handleDigit(digit) {
		dispatch('digit', digit);
    }

    function handleDecimalPoint() {
		dispatch('decimalPoint');
    }

    function handleEquals() {
		dispatch('equals');
    }
</script>

<svelte:window on:keydown={(e) => {
	const dataKey = e.key === 'Enter' ? '=' : e.key;
	const screenKey = document.querySelector(`[data-key="${dataKey}"]`);
	if (screenKey) {
		screenKey.click();
		activeKey = dataKey;
	}

	setTimeout(() => {activeKey = ''}, 100);
}} />

<div class="keyboard">
    <Button key="AC" keyType="function" on:click={allClear} />
    <Button keyType="blank" />
    <Button keyType="blank" />
    <Button key="/" keyType="function" on:click={() => handleOperator('/')} />

    <Button key="7" activeKey={activeKey} on:click={() => handleDigit('7')} />
    <Button key="8" activeKey={activeKey} on:click={() => handleDigit('8')} />
    <Button key="9" activeKey={activeKey} on:click={() => handleDigit('9')} />
    <Button key="*" keyType="function" on:click={() => handleOperator('*')} />

    <Button key="4" activeKey={activeKey} on:click={() => handleDigit('4')} />
    <Button key="5" activeKey={activeKey} on:click={() => handleDigit('5')} />
    <Button key="6" activeKey={activeKey} on:click={() => handleDigit('6')} />
    <Button key="-" keyType="function" on:click={() => handleOperator('-')} />

    <Button key="1" activeKey={activeKey} on:click={() => handleDigit('1')} />
    <Button key="2" activeKey={activeKey} on:click={() => handleDigit('2')} />
    <Button key="3" activeKey={activeKey} on:click={() => handleDigit('3')} />
    <Button key="+" keyType="function" activeKey={activeKey} on:click={() => handleOperator('+')} />

    <Button key="0" activeKey={activeKey} on:click={() => handleDigit('0')} />
    <Button key="." activeKey={activeKey} on:click={handleDecimalPoint} />
    <Button key="=" keyType="double" activeKey={activeKey} on:click={handleEquals} />
</div>

<style>
	.keyboard {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-template-rows: repeat(5, 1fr);
		grid-gap: 6px;
		margin-top: 36px;
	}
</style>