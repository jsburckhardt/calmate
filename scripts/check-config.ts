import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  type DashboardRawConfig,
  formatConfigError,
  parseDashboardConfig,
} from '../src/config/schemas';

const configFiles = {
  calendar: 'calendar.json',
  stocks: 'stocks.json',
  todos: 'todos.json',
  facts: 'facts.json',
  news: 'news.json',
} as const;

const rootDir = path.resolve(fileURLToPath(import.meta.url), '../..');
const dataDir = path.join(rootDir, 'src', 'data');

async function readJsonFile(fileName: string): Promise<unknown> {
  const filePath = path.join(dataDir, fileName);

  let fileContents: string;
  try {
    fileContents = await readFile(filePath, 'utf8');
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Missing config file: src/data/${fileName}. ${message}`);
  }

  try {
    return JSON.parse(fileContents) as unknown;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Invalid JSON in src/data/${fileName}: ${message}`);
  }
}

async function loadRawConfig(): Promise<DashboardRawConfig> {
  return {
    calendar: await readJsonFile(configFiles.calendar),
    stocks: await readJsonFile(configFiles.stocks),
    todos: await readJsonFile(configFiles.todos),
    facts: await readJsonFile(configFiles.facts),
    news: await readJsonFile(configFiles.news),
  };
}

async function checkConfig(): Promise<void> {
  const rawConfig = await loadRawConfig();
  parseDashboardConfig(rawConfig);
  console.log('Config validation passed.');
}

checkConfig().catch((error: unknown) => {
  console.error(formatConfigError(error));
  process.exitCode = 1;
});
