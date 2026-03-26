import { describe, expect, it } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useAuth } from './useAuth';

describe('useAuth', () => {
  it('initializes as authenticated when token and user exist', async () => {
    localStorage.setItem('authToken', JSON.stringify('token_123'));
    localStorage.setItem(
      'user',
      JSON.stringify({
        id: 1,
        username: 'test_user',
        name: 'test_user',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
    );

    const { result } = renderHook(() => useAuth());

    await waitFor(() => {
      expect(result.current.isInitialized).toBe(true);
    });

    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.user?.username).toBe('test_user');

    localStorage.clear();
    sessionStorage.clear();
  });

  it('initializes as unauthenticated without session data', async () => {
    localStorage.clear();
    sessionStorage.clear();

    const { result } = renderHook(() => useAuth());

    await waitFor(() => {
      expect(result.current.isInitialized).toBe(true);
    });

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();
  });
});
