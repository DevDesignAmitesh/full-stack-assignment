import { db, schema } from ".";

const IMAGE_URLS = [
  "https://images.pexels.com/photos/1087727/pexels-photo-1087727.jpeg",
  "https://images.pexels.com/photos/631212/pexels-photo-631212.jpeg",
  "https://images.pexels.com/photos/8903620/pexels-photo-8903620.jpeg",
  "https://images.pexels.com/photos/1447261/pexels-photo-1447261.jpeg",
  "https://images.pexels.com/photos/8306367/pexels-photo-8306367.jpeg",
  "https://images.pexels.com/photos/8311884/pexels-photo-8311884.jpeg",
];

const getRandomImage = () =>
  IMAGE_URLS[Math.floor(Math.random() * IMAGE_URLS.length)];

async function main() {
  try {
    const [orders, deals, payments] = await Promise.all([
      db.query.orders.findMany(),
      db.query.deals.findMany(),
      db.query.payments.findMany(),
    ]);

    if (orders.length === 0 && deals.length === 0 && payments.length === 0) {
      console.log("Database already seeded!!");
      process.exit(0);
    }
    /* -------------------- DEALS -------------------- */
    await db.insert(schema.deals).values([
      {
        title: "Winter Wear Sale",
        description: "Flat 40% off on jackets and hoodies",
        price: "1999",
        imgUrl: getRandomImage() ?? "",
        isAcive: true,
      },
      {
        title: "Smartphone Exchange Offer",
        description: "Exchange old phone and get cashback",
        price: "14999",
        imgUrl: getRandomImage() ?? "",
        isAcive: true,
      },
      {
        title: "Travel Backpack Deal",
        description: "Durable backpack for daily travel",
        price: "1299",
        imgUrl: getRandomImage() ?? "",
        isAcive: true,
      },
      {
        title: "Running Shoes Discount",
        description: "Lightweight shoes for daily running",
        price: "2999",
        imgUrl: getRandomImage() ?? "",
        isAcive: true,
      },
      {
        title: "Headphones Mega Sale",
        description: "Noise cancelling wireless headphones",
        price: "3499",
        imgUrl: getRandomImage() ?? "",
        isAcive: true,
      },
      {
        title: "Office Chair Offer",
        description: "Ergonomic chair with lumbar support",
        price: "6999",
        imgUrl: getRandomImage() ?? "",
        isAcive: true,
      },
    ]);

    /* -------------------- PAYMENTS -------------------- */
    await db.insert(schema.payments).values([
      {
        amount: "4000",
        status: "PENDING",
        description: "UPI Payment Pending",
        imgUrl: getRandomImage() ?? "",
      },
      {
        amount: "500",
        status: "FAILED",
        description: "Card payment failed",
        imgUrl: getRandomImage() ?? "",
      },
      {
        amount: "1500",
        status: "CONFIRMED",
        description: "Payment successful via UPI",
        imgUrl: getRandomImage() ?? "",
      },
      {
        amount: "899",
        status: "CONFIRMED",
        description: "Wallet payment success",
        imgUrl: getRandomImage() ?? "",
      },
      {
        amount: "12999",
        status: "PENDING",
        description: "Net banking pending",
        imgUrl: getRandomImage() ?? "",
      },
      {
        amount: "2499",
        status: "FAILED",
        description: "Transaction timed out",
        imgUrl: getRandomImage() ?? "",
      },
    ]);

    /* -------------------- ORDERS -------------------- */
    await db.insert(schema.orders).values([
      {
        productName: "Wireless Headphones",
        quantity: "1",
        status: "PENDING",
        imgUrl: getRandomImage() ?? "",
      },
      {
        productName: "Running Shoes",
        quantity: "2",
        status: "CONFIRMED",
        imgUrl: getRandomImage() ?? "",
      },
      {
        productName: "Laptop Backpack",
        quantity: "1",
        status: "CONFIRMED",
        imgUrl: getRandomImage() ?? "",
      },
      {
        productName: "Office Chair",
        quantity: "1",
        status: "PENDING",
        imgUrl: getRandomImage() ?? "",
      },
      {
        productName: "Smart Watch",
        quantity: "1",
        status: "REJECTED",
        imgUrl: getRandomImage() ?? "",
      },
      {
        productName: "Bluetooth Speaker",
        quantity: "3",
        status: "DELIVERED",
        imgUrl: getRandomImage() ?? "",
      },
    ]);

    console.log("Database seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error while seeding:", error);
    process.exit(1);
  }
}

main();
