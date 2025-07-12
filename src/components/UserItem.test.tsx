import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UserItem from './UserItem';

beforeEach(() => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => [{ id: 1, name: 'repo', description: 'desc', stargazers_count: 1 }],
  }) as any;
});

afterEach(() => {
  (global.fetch as jest.Mock).mockReset();
});

test('expands and loads repositories', async () => {
  render(<UserItem user={{ login: 'john' }} />);

  fireEvent.click(screen.getByRole('button'));

  await waitFor(() => {
    expect(screen.getByText('repo')).toBeInTheDocument();
    expect(screen.getByText('desc')).toBeInTheDocument();
  });
});
