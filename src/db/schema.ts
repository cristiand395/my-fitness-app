import {
  boolean, 
  date,
  numeric,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

//🧍Usuarios
export const users = pgTable("users", {
  id: uuid().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  gender: varchar({ length: 50 }),
  passwordHash: varchar("password_hash",{ length: 255 }).notNull(),
  birthdate: date().notNull(),
  weightUnit: varchar("weight_unit",{ length: 2 }).notNull().default("kg"), // 'kg' o 'lbs'
  lang: varchar({ length: 5 }).notNull().default("es"), // 'en', 'es', etc.
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ⚖️ Registro de peso corporal
export const bodyWeights = pgTable("body_weights", {
  id: uuid("id").primaryKey(),
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
  id: serial("id").primaryKey(),
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
  id: integer().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
});

// 💪 Músculos
export const muscles = pgTable("muscles", {
  id: integer().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  groupId: integer("group_id").notNull().references(() => muscleGroups.id),
});

// Equipamiento de ejercicio
export const equipment = pgTable("equipment", {
  id: integer().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  type: varchar({ length: 255 }).notNull().default("machine"), // free_weight, machine, body_weight, etc.
});

// 🏋️‍♂️ Tipos de ejercicio
export const exerciseTypes = pgTable("exercise_types", {
  id: integer().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  includeReps: boolean().notNull().default(true),
  includeWeight: boolean().notNull().default(true),
  includeNegativeWeights: boolean().notNull().default(false),
  includeDuration: boolean().notNull().default(false),
  includeDistance: boolean().notNull().default(false),
  bySide: boolean().notNull().default(false),
});

// 🏃‍♂️ Ejercicios
export const exercises = pgTable("exercises", {
  id: integer().primaryKey(),
  userId: uuid("user_id").references(() => users.id), // Ejercicios globales o por usuario
  name: varchar({ length: 255 }).notNull(),
  typeID: integer("type_id").notNull().references(() => exerciseTypes.id),
  equipmentID: integer("equipment_id").notNull().references(() => equipment.id),
  primaryMuscleId: integer("primary_muscle_id").notNull().references(() => muscles.id),
  secondaryMuscleId: integer("secondary_muscle_id").references(() => muscles.id),
  movementType: varchar({ length: 255 }).notNull().default("compound"), // Compuesto, aislado, etc.
  isFavorite: boolean().notNull().default(false),
  notes: text(),
});

// Entrenamientos (pertenecen a un usuario)
export const workouts = pgTable("workouts", {
  id: uuid("id").primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id),
  startAt: timestamp("start_at").notNull().defaultNow(),
  endAt: timestamp("end_at").notNull(),
  notes: text(),
});

// Sets / series de un ejercicio
export const sets = pgTable("sets", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  exerciseId: integer("exercise_id").notNull().references(() => exercises.id),
  workoutId: uuid("workout_id").notNull().references(() => workouts.id),
  reps: integer().notNull(),
  weight: numeric({ precision: 6, scale: 2 }),
  duration: integer().notNull(),
  order: integer().notNull(),
});

// Periodos de descarga
export const deloadPeriods = pgTable("deload_periods", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: uuid("user_id").notNull().references(() => users.id),
  startAt: timestamp("start_at").notNull().defaultNow(),
  endAt: timestamp("end_at").notNull(),
  intensityPercent: integer("intensity_percent").notNull().default(80),
  notes: text(),
});

// Registro de peso corporal por usuario
export const weightLogs = pgTable("weight_logs", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: uuid("user_id").notNull().references(() => users.id),
  // peso en gramos (int) o ajustar a numeric si prefieres kg con decimales
  weight: numeric({ precision: 6, scale: 2 }).notNull(),
  loggedAt: timestamp("logged_at").notNull().defaultNow(),
});
