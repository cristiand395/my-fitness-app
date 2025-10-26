import {
  boolean,
  date,
  numeric,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

//🧍Usuarios
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  gender: varchar("gender", { length: 50 }),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  birthdate: date("birthdate").notNull(),
  weightUnit: varchar("weight_unit", { length: 2 }).notNull().default("kg"), // 'kg' o 'lbs'
  lang: varchar("lang", { length: 5 }).notNull().default("es"), // 'en', 'es', etc.
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ⚖️ Registro de peso corporal
export const bodyWeights = pgTable("body_weights", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  weightKg: numeric("weight_kg", { precision: 6, scale: 2 }).notNull(),
  note: text(),
  date: date().notNull().defaultNow(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// 🔥 Registro de calorías
export const calories = pgTable("calories", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  calories: integer("calories").notNull(),
  note: text(),
  date: date().notNull().defaultNow(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// 💪 🦵 Grupo de músculos
export const muscleGroups = pgTable("muscle_groups", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
});

// 💪 Músculos
export const muscles = pgTable("muscles", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  groupId: uuid("group_id").notNull().references(() => muscleGroups.id),
});

// Equipamiento de ejercicio
export const equipment = pgTable("equipment", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  type: varchar("type", { length: 255 }).notNull().default("machine"), // free_weight, machine, body_weight, etc.
});

// 🏋️‍♂️ Tipos de ejercicio
export const exerciseTypes = pgTable("exercise_types", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  includeReps: boolean("include_reps").notNull().default(true),
  includeWeight: boolean("include_weight").notNull().default(true),
  includeNegativeWeights: boolean("include_negative_weights").notNull().default(false),
  includeDuration: boolean("include_duration").notNull().default(false),
  includeDistance: boolean("include_distance").notNull().default(false),
  bySide: boolean("by_side").notNull().default(false),
});

// 🏃‍♂️ Ejercicios
export const exercises = pgTable("exercises", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id), // Ejercicios globales o por usuario
  name: varchar("name", { length: 255 }).notNull(),
  typeID: uuid("type_id").notNull().references(() => exerciseTypes.id),
  equipmentID: uuid("equipment_id").notNull().references(() => equipment.id),
  primaryMuscleId: uuid("primary_muscle_id").notNull().references(() => muscles.id),
  secondaryMuscleId: uuid("secondary_muscle_id").references(() => muscles.id),
  movementType: varchar("movement_type", { length: 255 }).notNull().default("compound"), // Compuesto, aislado, etc.
  isFavorite: boolean("is_favorite").notNull().default(false),
  notes: text(),
});

// Entrenamientos (pertenecen a un usuario)
export const workouts = pgTable("workouts", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().references(() => users.id),
  startAt: timestamp("start_at").notNull().defaultNow(),
  endAt: timestamp("end_at"),
  notes: text(),
});

// Sets / series de un ejercicio
export const sets = pgTable("sets", {
  id: uuid("id").primaryKey().defaultRandom(),
  exerciseId: uuid("exercise_id").notNull().references(() => exercises.id),
  workoutId: uuid("workout_id").notNull().references(() => workouts.id),
  reps: integer("reps").notNull(),
  weight: numeric("weight", { precision: 6, scale: 2 }),
  duration: integer("duration"),
  orderIndex: integer("order_index").notNull(),
});

// Periodos de descarga
export const deloadPeriods = pgTable("deload_periods", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().references(() => users.id),
  startAt: timestamp("start_at").notNull().defaultNow(),
  endAt: timestamp("end_at"),
  intensityPercent: integer("intensity_percent").notNull().default(80),
  notes: text(),
});

// Registro de peso corporal por usuario
export const weightLogs = pgTable("weight_logs", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().references(() => users.id),
  weight: numeric("weight", { precision: 6, scale: 2 }).notNull(),
  loggedAt: timestamp("logged_at").notNull().defaultNow(),
});
