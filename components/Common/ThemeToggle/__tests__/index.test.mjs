import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { LocaleProvider } from '@/providers/localeProvider';

import ThemeToggle from '../';

let mockCurrentTheme = 'light';

const toggleTheme = () => {
  mockCurrentTheme = mockCurrentTheme === 'light' ? 'dark' : 'light';
};

describe('ThemeToggle', () => {
  let toggle;

  beforeEach(() => {
    mockCurrentTheme = 'light';

    render(
      <LocaleProvider>
        <ThemeToggle onClick={toggleTheme} />
      </LocaleProvider>
    );
    toggle = screen.getByRole('button');
  });

  it('switches dark theme to light theme', async () => {
    mockCurrentTheme = 'dark';
    await userEvent.click(toggle);
    expect(mockCurrentTheme).toBe('light');
  });

  it('switches light theme to dark theme', async () => {
    await userEvent.click(toggle);
    expect(mockCurrentTheme).toBe('dark');
  });
});
