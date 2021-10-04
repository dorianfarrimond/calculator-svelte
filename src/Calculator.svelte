<script>
	import calculator from './services/calculator';

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

	function handleDigit(digit) {
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

	function handleOperator(op) {
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
	}
</script>

<svelte:window on:keydown={(e) => {
	const dataKey = e.key === 'Enter' ? '=' : e.key;
	const screenKey = document.querySelector(`[data-key="${dataKey}"]`)
	if (screenKey) {
		screenKey.click();
	}
    }
}/>

<div class="container">
    <div class="display-window">
        <input type="text" value={mode === EDITMODES.VALUE ? value : operand} />
    </div>

    <div class="keyboard">
        <button class="function" on:click={allClear}>AC</button>
        <button class="blank"></button>
        <button class="blank"></button>
        <button data-key="/" class="function" on:click={() => handleOperator('/')}>/</button>

        <button data-key="7" on:click={() => handleDigit('7')}>7</button>
        <button data-key="8" on:click={() => handleDigit('8')}>8</button>
        <button data-key="9" on:click={() => handleDigit('9')}>9</button>
        <button data-key="*" class="function" on:click={() => handleOperator('*')}>*</button>

        <button data-key="4" on:click={() => handleDigit('4')}>4</button>
        <button data-key="5" on:click={() => handleDigit('5')}>5</button>
        <button data-key="6" on:click={() => handleDigit('6')}>6</button>
        <button data-key="-"class="function" on:click={() => handleOperator('-')}>-</button>

        <button data-key="1" on:click={() => handleDigit('1')}>1</button>
        <button data-key="2" on:click={() => handleDigit('2')}>2</button>
        <button data-key="3" on:click={() => handleDigit('3')}>3</button>
        <button data-key="+" class="function" on:click={() => handleOperator('+')}>+</button>

        <button data-key="0" on:click={() => handleDigit('0')}>0</button>
        <button data-key="." on:click={handleDecimalPoint}>.</button>
        <button data-key="=" class="equals" on:click={handleEquals}>=</button>
    </div>
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

    .keyboard{
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: repeat(5, 1fr);
        grid-gap: 6px;
        margin-top: 36px;
    }

    button {
        font-size: 3rem;
        padding: 12px;
        border-radius: 8px;
        background-color: white;
        border: none;
    }

    button:active {
      opacity: 0.5;
    }

    button.function {
        background-color: #fed800;
    }

    button.equals{
        grid-column: span 2;
    }

    button.blank {
        visibility: hidden;
    }
</style>