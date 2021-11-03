<script>
	import calculator from '../services/calculator';
	import Keyboard from './Keyboard.svelte';

	const TYPINGMODES = {
		INSERT: 'INSERT',
		APPEND: 'APPEND'
	};

	const EDITMODES = {
		VALUE: 'VALUE',
		OPERAND: 'OPERAND'
	};

	let typingMode = TYPINGMODES.INSERT;
	let mode = EDITMODES.VALUE;
	let value = 0;
	let operator;
	let operand = 0;

	function allClear() {
		typingMode = TYPINGMODES.INSERT;
		mode = EDITMODES.VALUE;
		value = 0;
		operator = null;
		operand = 0;
	}

	function handleDigit({ detail: digit }) {
		const currentValue = mode === EDITMODES.VALUE ? value : operand;
		const newValue = typingMode === TYPINGMODES.INSERT ? digit : currentValue.toString() + digit.toString();

		if (mode === EDITMODES.VALUE) {
			value = newValue;
		} else {
			operand = newValue;
		}
		typingMode = EDITMODES.APPEND;
	}

	function handleDecimalPoint() {
		const currentValue = mode === EDITMODES.VALUE ? value : operand;
		if (parseInt(currentValue, 10) < 1 || currentValue.includes('.')) {
			return;
		}

		const newValue = typingMode === TYPINGMODES.INSERT ? '.' : currentValue.toString() + '.';

		if (mode === EDITMODES.VALUE) {
			value = newValue;
		} else {
			operand = newValue;
		}
		typingMode = EDITMODES.APPEND;
	}

	function handleOperator({detail: op}) {
		typingMode = TYPINGMODES.INSERT;

		if (operator) {
			const total = calculator(parseFloat(value), operator, parseFloat(operand));
			value = total;
			operand = total;
		} else {
			operand = value;
		}

		operator = op;
		mode = EDITMODES.OPERAND;
	}

	const handleEquals = () => {
		value = calculator(parseFloat(value), operator, parseFloat(operand));
		typingMode = TYPINGMODES.INSERT;
		mode = EDITMODES.VALUE;
	};
</script>

<div class="container">
    <div class="display-window">
        <input type="text" value={mode === EDITMODES.VALUE ? value : operand} />
    </div>

    <Keyboard
        on:clear={allClear}
        on:digit={handleDigit}
        on:operator={handleOperator}
        on:decimalPoint={handleDecimalPoint}
        on:equals={handleEquals}
    />
</div>

<style>
    .container {
        width: 400px;
        height: 570px;
        background-color: #1795d4;
        padding: 16px;
        border-radius: 16px;
    }

    .display-window{
        margin-top: 16px;
        padding: 8px 4px;
        border: 1px solid grey;
        background-color: white;
        border-radius: 12px;
    }

    input {
        font-family: "Courier New", sans-serif;
        display: block;
        width: 100%;
        text-align: right;
        padding: 0;
        font-size: 3rem;
        outline: none;
        border: none;
    }
</style>