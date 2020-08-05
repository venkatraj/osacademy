# Migration `20200805104705-userrole-field`

This migration has been generated at 8/5/2020, 4:17:05 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."User" ADD COLUMN "role" "UserRole" NOT NULL DEFAULT E'Student';
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200805102117-remove-updated-at..20200805104705-userrole-field
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
@@ -14,8 +14,9 @@
   id Int @id @default(autoincrement())
   email String @unique
   password String
   name  String 
+  role UserRole @default(Student)
   createdAt DateTime @default(now())
   courses CourseEnrollment[]
 }
```


