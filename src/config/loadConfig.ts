import calendar from '../data/calendar.json';
import facts from '../data/facts.json';
import news from '../data/news.json';
import stocks from '../data/stocks.json';
import todos from '../data/todos.json';
import {
  type DashboardConfig,
  type DashboardRawConfig,
  parseDashboardConfig,
} from './schemas';

const dashboardRawConfig: DashboardRawConfig = {
  calendar,
  stocks,
  todos,
  facts,
  news,
};

export function loadDashboardConfig(
  rawConfig: DashboardRawConfig = dashboardRawConfig,
): DashboardConfig {
  return parseDashboardConfig(rawConfig);
}
