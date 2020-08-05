# Migration `20200805102117-remove-updated-at`

This migration has been generated at 8/5/2020, 3:51:17 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Course" DROP COLUMN "updatedAt";
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200805101949-missing-pwd-field..20200805102117-remove-updated-at
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
@@ -23,9 +23,8 @@
   id Int @id @default(autoincrement())
   title String @unique
   description String
   createdAt DateTime @default(now())
-  updatedAt DateTime
   users CourseEnrollment[]
 }
 enum UserRole {
```


