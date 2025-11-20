import "server-only";

import axios, { AxiosInstance } from "axios";

// Create axios instance for Terminal API
const createTerminalClient = (baseURL: string): AxiosInstance => {
  return axios.create({
    baseURL,
    timeout: 30000, // 30 seconds
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.TERMINAL_SECRET_KEY}`,
    },
  });
};

// Terminal API clients
export const terminalClient = createTerminalClient(
  process.env.TERMINAL_BASE_URL || "https://api.terminal.africa/v1",
);

// Helper for making requests
export const makeTerminalRequest = async <T>(
  requestFn: () => Promise<{ data: T }>,
): Promise<T> => {
  const response = await requestFn();
  return response.data;
};
