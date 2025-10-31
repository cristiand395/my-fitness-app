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

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
  //  Campos adicionales a BetterAuth
  age: integer("age"),
  gender: varchar("gender", { length: 50 }),
  heightCm: numeric("height_cm", { precision: 5, scale: 2 }),
  weightKg: numeric("weight_kg", { precision: 5, scale: 2 }),
  themeMode: varchar("theme_mode", { length: 50 }).notNull().default("system"), // light, dark, system
  weightGoalKg: numeric("weight_goal_kg", { precision: 5, scale: 2 }),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

// ⚖️ Registro de peso corporal
export const bodyWeight = pgTable("body_weight", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  weightKg: numeric("weight_kg", { precision: 6, scale: 2 }).notNull(),
  note: text(),
  date: date().notNull().defaultNow(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// 🔥 Registro de calorías
export const calorie = pgTable("calorie", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  calories: integer("calories").notNull(),
  note: text(),
  date: date().notNull().defaultNow(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// 💪 🦵 Grupo de músculos
export const muscleGroup = pgTable("muscle_group", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
});

// 💪 Músculos
export const muscle = pgTable("muscle", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  groupId: uuid("group_id").notNull().references(() => muscleGroup.id),
});

// Equipamiento de ejercicio
export const equipment = pgTable("equipment", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  type: varchar("type", { length: 255 }).notNull().default("machine"), // free_weight, machine, body_weight, etc.
});

// 🏋️‍♂️ Tipos de ejercicio
export const exerciseType = pgTable("exercise_type", {
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
export const exercise = pgTable("exercise", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id").references(() => user.id), // Ejercicios globales o por usuario
  name: varchar("name", { length: 255 }).notNull(),
  typeID: uuid("type_id").notNull().references(() => exerciseType.id),
  equipmentID: uuid("equipment_id").notNull().references(() => equipment.id),
  primaryMuscleId: uuid("primary_muscle_id").notNull().references(() => muscle.id),
  secondaryMuscleId: uuid("secondary_muscle_id").references(() => muscle.id),
  movementType: varchar("movement_type", { length: 255 }).notNull().default("compound"), // Compuesto, aislado, etc.
  isFavorite: boolean("is_favorite").notNull().default(false),
  notes: text(),
});

// Entrenamientos (pertenecen a un usuario)
export const workout = pgTable("workout", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id").notNull().references(() => user.id),
  startAt: timestamp("start_at").notNull().defaultNow(),
  endAt: timestamp("end_at"),
  notes: text(),
});

// Sets / series de un ejercicio
export const set = pgTable("set", {
  id: uuid("id").primaryKey().defaultRandom(),
  exerciseId: uuid("exercise_id").notNull().references(() => exercise.id),
  workoutId: uuid("workout_id").notNull().references(() => workout.id),
  reps: integer("reps").notNull(),
  weight: numeric("weight", { precision: 6, scale: 2 }),
  duration: integer("duration"),
  orderIndex: integer("order_index").notNull(),
});

// Periodos de descarga
export const deloadPeriod = pgTable("deload_period", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id").notNull().references(() => user.id),
  startAt: timestamp("start_at").notNull().defaultNow(),
  endAt: timestamp("end_at"),
  intensityPercent: integer("intensity_percent").notNull().default(80),
  notes: text(),
});

// Registro de peso corporal por usuario
export const weightLog = pgTable("weight_log", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id").notNull().references(() => user.id),
  weight: numeric("weight", { precision: 6, scale: 2 }).notNull(),
  loggedAt: timestamp("logged_at").notNull().defaultNow(),
});
