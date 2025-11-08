import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/index"; // your drizzle instance
import { user, session, account, verification } from "@/db/schema";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL || process.env.BETTER_AUTH_URL || "http://localhost:3000",
    basePath: "/api/auth",
    database: drizzleAdapter(db, {
        provider: "pg",
        // Pass the DB schema so the adapter can find the tables/models
        schema: {
            user,
            session,
            account,
            verification,
        },
    }),
    emailAndPassword: {
        enabled: true,
    },
    plugins: [nextCookies()]
});