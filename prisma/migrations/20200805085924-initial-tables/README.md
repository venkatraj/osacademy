# Migration `20200805085924-initial-tables`

This migration has been generated at 8/5/2020, 2:29:24 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TYPE "UserRole" AS ENUM ('Admin', 'Instructor', 'Student');

CREATE TABLE "public"."User" (
"id" SERIAL,
"email" text  NOT NULL ,
"name" text  NOT NULL ,
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY ("id"))

CREATE TABLE "public"."Course" (
"id" SERIAL,
"title" text  NOT NULL ,
"description" text  NOT NULL ,
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)  NOT NULL ,
PRIMARY KEY ("id"))

CREATE TABLE "public"."CourseEnrollment" (
"id" SERIAL,
"role" "UserRole" NOT NULL ,
"userId" integer  NOT NULL ,
"courseId" integer  NOT NULL ,
PRIMARY KEY ("id"))

CREATE UNIQUE INDEX "User.email_unique" ON "public"."User"("email")

CREATE UNIQUE INDEX "Course.title_unique" ON "public"."Course"("title")

CREATE UNIQUE INDEX "CourseEnrollment.userId_courseId_unique" ON "public"."CourseEnrollment"("userId","courseId")

ALTER TABLE "public"."CourseEnrollment" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."CourseEnrollment" ADD FOREIGN KEY ("courseId")REFERENCES "public"."Course"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200805085924-initial-tables
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,45 @@
+// This is your Prisma schema file,
+// learn more about it in the docs: https://pris.ly/d/prisma-schema
+
+datasource db {
+  provider = "postgresql"
+  url = "***"
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model User {
+  id Int @id @default(autoincrement())
+  email String @unique
+  name  String 
+  createdAt DateTime @default(now())
+  courses CourseEnrollment[]
+}
+
+model Course {
+  id Int @id @default(autoincrement())
+  title String @unique
+  description String
+  createdAt DateTime @default(now())
+  updatedAt DateTime
+  users CourseEnrollment[]
+}
+
+enum UserRole {
+  Admin
+  Instructor
+  Student
+}
+
+model CourseEnrollment {
+  id Int @id @default(autoincrement())
+  role UserRole
+  userId  Int
+  user User @relation(fields: [userId], references: [id])
+  courseId  Int
+  course Course @relation(fields: [courseId], references: [id])
+  @@unique([userId, courseId])
+}
+
```


