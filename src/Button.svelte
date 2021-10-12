<script>
	export let key = '';
	export let activeKey;
	export let keyType = '';
</script>

<button
    on:click data-key={key}
    class:function={keyType === 'function'}
    class:double={keyType === 'double'}
    class:blank={keyType === 'blank'}
    class:activated={activeKey === key}>{key}</button>

<style>
    button {
        font-size: 3rem;
        padding: 12px;
        border-radius: 8px;
        background-color: white;
        border: none;
    }

    button:active, button.activated {
        opacity: 0.5;
    }

    button.function {
        background-color: #fed800;
    }

    button.double{
        grid-column: span 2;
    }

    button.blank {
        visibility: hidden;
    }

</style>