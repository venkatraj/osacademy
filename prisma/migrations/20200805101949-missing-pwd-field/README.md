# Migration `20200805101949-missing-pwd-field`

This migration has been generated at 8/5/2020, 3:49:49 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."User" ADD COLUMN "password" text  NOT NULL ;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200805085924-initial-tables..20200805101949-missing-pwd-field
--- datamodel.dml
+++ datamodel.dml
@@ -2,9 +2,9 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
@@ -12,8 +12,9 @@
 model User {
   id Int @id @default(autoincrement())
   email String @unique
+  password String
   name  String 
   createdAt DateTime @default(now())
   courses CourseEnrollment[]
 }
@@ -33,10 +34,10 @@
   Student
 }
 model CourseEnrollment {
-  id Int @id @default(autoincrement())
-  role UserRole
+  id  Int @id @default(autoincrement())
+  role  UserRole
   userId  Int
   user User @relation(fields: [userId], references: [id])
   courseId  Int
   course Course @relation(fields: [courseId], references: [id])
```


