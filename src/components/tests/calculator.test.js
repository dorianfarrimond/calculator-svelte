import Calculator from '../Calculator.svelte';
import { fireEvent, render, screen, within } from '@testing-library/svelte';

describe('Calculator', () => {
	describe('on initial render', () => {
		it('should display a textbox with the expected initial value', () => {
			render(Calculator);

			const displayWindow = screen.getByRole('textbox');
			expect(displayWindow).toBeInTheDocument();
			expect(displayWindow.value).toBe('0');
		});

		it('should allow the value to be input', () => {
			render(Calculator);

			const keyboard = screen.getByRole('group');
			fireEvent.click(within(keyboard).getByText('1'));
			fireEvent.click(within(keyboard).getByText('5'));

			const displayWindow = screen.getByRole('textbox');
			expect(displayWindow.value).toBe('15');
		});

		it('should render the expected buttons', () => {
			render(Calculator);

			expect(screen.getByText('+')).toBeInTheDocument();
			expect(screen.getByText('-')).toBeInTheDocument();
			expect(screen.getByText('*')).toBeInTheDocument();
			expect(screen.getByText('/')).toBeInTheDocument();
		});
	});
});