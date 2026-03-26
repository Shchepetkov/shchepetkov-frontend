import { describe, expect, it } from 'vitest';
import { extractApiErrorMessage } from './api';

describe('extractApiErrorMessage', () => {
  it('returns message from structured payload', () => {
    const error = {
      response: {
        data: {
          message: 'Validation failed',
          code: 'VALIDATION_ERROR',
        },
      },
    };

    expect(extractApiErrorMessage(error)).toBe('Validation failed');
  });

  it('returns string payload as message', () => {
    const error = {
      response: {
        data: 'Plain text error',
      },
    };

    expect(extractApiErrorMessage(error)).toBe('Plain text error');
  });

  it('returns server unavailable message for network errors', () => {
    const error = { request: {} };
    expect(extractApiErrorMessage(error)).toContain('Сервер недоступен');
  });
});
