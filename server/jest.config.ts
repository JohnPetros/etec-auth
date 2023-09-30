import type { Config } from 'jest'

export default async (): Promise<Config> => {
  return {
    bail: true,
    testEnvironment: 'node',
    preset: 'ts-jest',
    testMatch: ['<rootDir>/src/**/*.test.ts'],
  }
}
