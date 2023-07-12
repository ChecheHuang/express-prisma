import { PrismaClient, Users } from "@prisma/client";
import { fakerZH_TW as faker } from "@faker-js/faker";
const prisma = new PrismaClient();

function getRandomItemFromArray(arr: any[]) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

function randomPhone() {
  let phoneNumber = "09";

  for (let i = 0; i < 8; i++) {
    phoneNumber += Math.floor(Math.random() * 10);
  }

  return phoneNumber;
}

function generateTWID() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const firstLetter = letters[Math.floor(Math.random() * letters.length)];
  const firstDigit = Math.floor(Math.random() * 2) + 1;
  let rest = "";

  for (let i = 0; i < 8; i++) {
    rest += Math.floor(Math.random() * 10);
  }

  return `${firstLetter}${firstDigit}${rest}`;
}

function randomDate() {
  const today = new Date();
  const hundredYearsAgo = new Date();
  hundredYearsAgo.setFullYear(today.getFullYear() - 70);
  const startDate = hundredYearsAgo.getTime();
  const endDate = today.getTime();
  const randomDate = new Date(
    startDate + Math.random() * (endDate - startDate)
  );
  const year = randomDate.getFullYear();
  const month = parseInt(String(randomDate.getMonth() + 1).padStart(2, "0"));
  const day = parseInt(String(randomDate.getDate()).padStart(2, "0"));
  // return `${year}-${month}-${day}`;
  return new Date(year, month, day);
}

async function createCusProfileLabels(
  cusProfileIds: number[],
  labelIds: number[]
) {
  const cusProfileLabelsData = [];

  for (const cusProfileId of cusProfileIds) {
    for (const labelId of labelIds) {
      const randomNum = Math.random();
      if (randomNum <= 0.25) {
        cusProfileLabelsData.push({ cus_id: cusProfileId, label_id: labelId });
      }
    }
  }

  await prisma.cusProfileLabel.createMany({ data: cusProfileLabelsData });
}

async function createCusProfile(user: Users, length: number = 100) {
  const levelOptions = ["銅", "銀", "金", "白金"];
  const statusOptions = ["新客戶", "舊客戶", "潛在客戶"];
  const cusProfileIds: number[] = [];
  for (let i = 0; i < length; i++) {
    const cusProfile = await prisma.cusProfile.create({
      data: {
        create_user_id: user.id,
        cus_name: faker.person.fullName(),
        cus_number: randomPhone(),
        cus_email: faker.internet.email(),
        cus_idnumber: generateTWID(),
        cus_birthday: randomDate(),
        cus_remark: faker.commerce.product(),
        cus_status: getRandomItemFromArray(statusOptions),
        cus_level: getRandomItemFromArray(levelOptions),
        cus_avatar: faker.image.avatar(),
      },
    });

    cusProfileIds.push(cusProfile.id);
  }
  return cusProfileIds;
}
async function createLabels() {
  const traits = [
    "勇敢的",
    "誠實的",
    "謙遜的",
    "慷慨的",
    "善良的",
    "聰明的",
    "創意的",
    "堅定的",
    "謹慎的",
    "熱情的",
  ];
  const labelIds = [];
  for (const trait of traits) {
    const createdLabel = await prisma.labels.create({
      data: {
        label_name: trait,
      },
    });
    labelIds.push(createdLabel.id);
  }
  return labelIds;
}

async function main() {
  console.log("開始創建資料庫");
  await prisma.users.deleteMany();
  await prisma.labels.deleteMany();
  await prisma.cusProfileLabel.deleteMany();
  await prisma.cusProfile.deleteMany();
  await prisma.$executeRaw`ALTER TABLE users AUTO_INCREMENT = 1;`;
  await prisma.$executeRaw`ALTER TABLE labels AUTO_INCREMENT = 1;`;
  await prisma.$executeRaw`ALTER TABLE cus_profile AUTO_INCREMENT = 1;`;
  await prisma.$executeRaw`ALTER TABLE cus_profile_label AUTO_INCREMENT = 1;`;
  //todo 創建一個會員
  const createUser = await prisma.users.create({
    data: {
      user_name: "Carl",
      user_password:
        "$2b$10$xZ.bJZerVzFShYujW5.jM.7jGH9VNda/gQ2JZyzG3RDWfVzil5ZAG",
      user_email: "carl@verygood.com.tw",
      user_avatar:
        "https://images.pexels.com/photos/6875732/pexels-photo-6875732.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  });
  console.log("創建會員");
  //todo 創建客戶資料
  const cusProfileIds = await createCusProfile(createUser, 5000);
  console.log("創建客戶");

  //todo 創建label名稱
  const labelIds = await createLabels();
  console.log("創建label");
  // return
  //todo 創建客戶label資料
  await createCusProfileLabels(cusProfileIds, labelIds);
  console.log("創建客戶label");
  console.log("創建完畢");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
