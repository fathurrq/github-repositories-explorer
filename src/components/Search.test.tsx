import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SearchProvider } from '@/context/SearchContext';
import Search from './Search';

beforeEach(() => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ items: [{ login: 'john' }] }),
  }) as jest.MockedFunction<typeof fetch>
});

afterEach(() => {
  (global.fetch as jest.Mock).mockReset();
});

test('searches and displays users', async () => {
  render(
    <SearchProvider>
      <Search />
    </SearchProvider>
  );

  fireEvent.change(screen.getByPlaceholderText('Search GitHub users'), {
    target: { value: 'john' },
  });
  fireEvent.click(screen.getByText('Search'));

  await waitFor(() => {
    expect(screen.getByText('john')).toBeInTheDocument();
  });
});
