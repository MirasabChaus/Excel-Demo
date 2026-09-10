import {
  pgTable,
  serial,
  text,
  integer,
  jsonb,
  uniqueIndex,
} from "drizzle-orm/pg-core";

/**
 * Demo examples are rendered side-by-side: the "before" table shows raw data,
 * the "after" table shows the result once the formula/feature is applied.
 */
export type DemoData = {
  beforeTitle: string;
  beforeHeaders: string[];
  beforeRows: (string | number)[][];
  afterTitle: string;
  afterHeaders: string[];
  afterRows: (string | number)[][];
  steps: string[];
};

export const modules = pgTable("modules", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  level: text("level").notNull(), // Beginner | Intermediate | Advanced
  tagline: text("tagline").notNull(),
  description: text("description").notNull(),
  order: integer("order").notNull().default(0),
  icon: text("icon").notNull(),
  accent: text("accent").notNull(),
});

export const lessons = pgTable(
  "lessons",
  {
    id: serial("id").primaryKey(),
    moduleId: integer("module_id")
      .notNull()
      .references(() => modules.id, { onDelete: "cascade" }),
    slug: text("slug").notNull(),
    title: text("title").notNull(),
    summary: text("summary").notNull(),
    durationMin: integer("duration_min").notNull().default(5),
    order: integer("order").notNull().default(0),
    videoId: text("video_id").notNull(),
    videoStart: integer("video_start").notNull().default(0),
    level: text("level").notNull(),
    keyPoints: jsonb("key_points").$type<string[]>().notNull(),
    formula: text("formula").notNull(),
    formulaExplain: text("formula_explain").notNull(),
    demo: jsonb("demo").$type<DemoData>().notNull(),
    task: text("task").notNull(),
    taskData: jsonb("task_data").$type<string[][]>().notNull(),
    taskTarget: text("task_target").notNull(),
    taskExpected: text("task_expected").notNull(),
  },
  (t) => ({
    uniq: uniqueIndex("lessons_module_slug_idx").on(t.moduleId, t.slug),
  }),
);

export type Module = typeof modules.$inferSelect;
export type Lesson = typeof lessons.$inferSelect;
