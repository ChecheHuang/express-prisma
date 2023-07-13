-- CreateTable
CREATE TABLE "Users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_name" TEXT NOT NULL,
    "user_password" TEXT NOT NULL,
    "user_email" TEXT NOT NULL,
    "user_avatar" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "cus_profile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "create_user_id" INTEGER NOT NULL,
    "cus_name" TEXT NOT NULL,
    "cus_number" TEXT NOT NULL,
    "cus_email" TEXT NOT NULL,
    "cus_idnumber" TEXT NOT NULL,
    "cus_birthday" DATETIME,
    "cus_remark" TEXT NOT NULL,
    "cus_status" TEXT NOT NULL,
    "cus_level" TEXT NOT NULL,
    "cus_avatar" TEXT NOT NULL,
    "edit_user_id" INTEGER,
    "update_time" DATETIME,
    CONSTRAINT "cus_profile_create_user_id_fkey" FOREIGN KEY ("create_user_id") REFERENCES "Users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "cus_profile_edit_user_id_fkey" FOREIGN KEY ("edit_user_id") REFERENCES "Users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "cus_profile_label" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cus_id" INTEGER NOT NULL,
    "label_id" INTEGER NOT NULL,
    CONSTRAINT "cus_profile_label_cus_id_fkey" FOREIGN KEY ("cus_id") REFERENCES "cus_profile" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "cus_profile_label_label_id_fkey" FOREIGN KEY ("label_id") REFERENCES "Labels" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Labels" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "label_name" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Labels_label_name_key" ON "Labels"("label_name");
