import { z, ZodError } from 'zod';

const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/;
const timePattern = /^([01]\d|2[0-3]):[0-5]\d$/;

function isValidDateString(value: string): boolean {
  if (!isoDatePattern.test(value)) {
    return false;
  }

  const [yearText, monthText, dayText] = value.split('-');
  const year = Number(yearText);
  const monthIndex = Number(monthText) - 1;
  const day = Number(dayText);
  const date = new Date(Date.UTC(year, monthIndex, day));

  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === monthIndex &&
    date.getUTCDate() === day
  );
}

const RequiredStringSchema = z.string().min(1, 'Required text must not be empty');

export const CalendarEventSchema = z.object({
  id: RequiredStringSchema,
  title: RequiredStringSchema,
  date: z
    .string()
    .regex(isoDatePattern, 'Use YYYY-MM-DD date format')
    .refine(isValidDateString, 'Invalid calendar event date'),
  time: z.string().regex(timePattern, 'Use HH:mm 24-hour time format').optional(),
  description: z.string().optional(),
  type: z.string().optional(),
});

export const CalendarConfigSchema = z.object({
  events: z.array(CalendarEventSchema),
});

export const StockSchema = z.object({
  ticker: RequiredStringSchema,
  name: z.string().optional(),
  price: z.number(),
});

export const StocksConfigSchema = z.object({
  stocks: z.array(StockSchema),
});

export const TodoSchema = z.object({
  id: RequiredStringSchema,
  title: RequiredStringSchema,
  done: z.boolean(),
});

export const TodosConfigSchema = z.object({
  todos: z.array(TodoSchema),
});

export const FactsConfigSchema = z.object({
  refreshMinutes: z.number().positive().default(10),
  facts: z.array(RequiredStringSchema),
});

export const NewsItemSchema = z.object({
  id: RequiredStringSchema,
  title: RequiredStringSchema,
  source: RequiredStringSchema,
  url: z.string().url().optional(),
  publishedAt: z.string().datetime({ offset: true }),
});

export const NewsConfigSchema = z.object({
  news: z.array(NewsItemSchema),
});

export const DashboardConfigSchema = z.object({
  calendar: CalendarConfigSchema,
  stocks: StocksConfigSchema,
  todos: TodosConfigSchema,
  facts: FactsConfigSchema,
  news: NewsConfigSchema,
});

export type CalendarEvent = z.infer<typeof CalendarEventSchema>;
export type CalendarConfig = z.infer<typeof CalendarConfigSchema>;
export type Stock = z.infer<typeof StockSchema>;
export type Todo = z.infer<typeof TodoSchema>;
export type FactsConfig = z.infer<typeof FactsConfigSchema>;
export type NewsItem = z.infer<typeof NewsItemSchema>;
export type DashboardConfig = z.infer<typeof DashboardConfigSchema>;

export type DashboardRawConfig = {
  calendar: unknown;
  stocks: unknown;
  todos: unknown;
  facts: unknown;
  news: unknown;
};

export function parseDashboardConfig(rawConfig: DashboardRawConfig): DashboardConfig {
  return DashboardConfigSchema.parse(rawConfig);
}

export function formatConfigError(error: unknown): string {
  if (error instanceof ZodError) {
    return error.issues
      .map((issue) => {
        const path = issue.path.length > 0 ? issue.path.join('.') : 'config';
        return `${path}: ${issue.message}`;
      })
      .join('\n');
  }

  if (error instanceof Error) {
    return error.message;
  }

  return String(error);
}
