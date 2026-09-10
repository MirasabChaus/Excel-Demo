import { db } from "@/db";
import { modules, lessons, type Module, type Lesson } from "@/db/schema";
import { and, asc, eq } from "drizzle-orm";

export async function getAllModules(): Promise<Module[]> {
  return db.select().from(modules).orderBy(asc(modules.order));
}

export async function getModuleBySlug(slug: string): Promise<Module | undefined> {
  const rows = await db
    .select()
    .from(modules)
    .where(eq(modules.slug, slug))
    .limit(1);
  return rows[0];
}

export async function getLessonsByModule(
  moduleId: number,
): Promise<Lesson[]> {
  return db
    .select()
    .from(lessons)
    .where(eq(lessons.moduleId, moduleId))
    .orderBy(asc(lessons.order));
}

export async function getLessonBySlug(
  moduleId: number,
  slug: string,
): Promise<Lesson | undefined> {
  const rows = await db
    .select()
    .from(lessons)
    .where(and(eq(lessons.moduleId, moduleId), eq(lessons.slug, slug)))
    .limit(1);
  return rows[0];
}

export async function getAllLessons(): Promise<Lesson[]> {
  return db.select().from(lessons).orderBy(asc(lessons.moduleId), asc(lessons.order));
}
