/**
 * @file: githubApi.ts
 * @description: GitHub API client for public repositories
 * @dependencies: src/services/api.ts
 * @created: 2026-03-26
 */

import axios from 'axios';

export interface GithubRepo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
}

const githubApi = axios.create({
  baseURL: 'https://api.github.com',
  timeout: 10000,
  headers: {
    Accept: 'application/vnd.github+json',
  },
});

export const fetchPublicRepos = async (username: string, limit = 4): Promise<GithubRepo[]> => {
  const response = await githubApi.get<GithubRepo[]>(`/users/${username}/repos`, {
    params: {
      sort: 'updated',
      per_page: limit,
    },
  });
  return response.data;
};
