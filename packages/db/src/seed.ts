import { db, schema } from ".";

const IMAGE_URL =
  "https://img.freepik.com/free-photo/courage-man-jump-through-gap-hill-business-concept-idea_1323-262.jpg";

async function main() {
  try {
    await Promise.all([
      db.insert(schema.deals).values([
        {
          title: "Winter Wear Sale",
          description: "Flat 40% off on jackets and hoodies",
          imgUrl: IMAGE_URL,
          isAcive: true,
          price: "1999",
        },
        {
          title: "Smartphone Exchange Offer",
          description: "Exchange old phone and get cashback",
          imgUrl: IMAGE_URL,
          isAcive: true,
          price: "14999",
        },
        {
          title: "Travel Backpack Deal",
          description: "Durable backpack for daily travel",
          imgUrl: IMAGE_URL,
          isAcive: true,
          price: "1299",
        },
        {
          title: "Running Shoes Discount",
          description: "Lightweight shoes for daily running",
          imgUrl: IMAGE_URL,
          isAcive: true,
          price: "2999",
        },
        {
          title: "Headphones Mega Sale",
          description: "Noise cancelling wireless headphones",
          imgUrl: IMAGE_URL,
          isAcive: true,
          price: "3499",
        },
        {
          title: "Office Chair Offer",
          description: "Ergonomic chair with lumbar support",
          imgUrl: IMAGE_URL,
          isAcive: true,
          price: "6999",
        },
      ]),

      db.insert(schema.payments).values([
        {
          amount: "₹4000",
          status: "PENDING",
        },
        {
          amount: "₹500",
          status: "FAILED",
        },
        {
          amount: "₹1500",
          status: "CONFIRMED",
        },
        {
          amount: "₹899",
          status: "CONFIRMED",
        },
        {
          amount: "₹12999",
          status: "PENDING",
        },
        {
          amount: "₹2499",
          status: "FAILED",
        },
      ]),

      db.insert(schema.orders).values([
        {
          imgUrl: IMAGE_URL,
          productName: "Wireless Headphones",
          status: "PENDING",
        },
        {
          imgUrl: IMAGE_URL,
          productName: "Running Shoes",
          status: "CONFIRMED",
        },
        {
          imgUrl: IMAGE_URL,
          productName: "Laptop Backpack",
          status: "CONFIRMED",
        },
        {
          imgUrl: IMAGE_URL,
          productName: "Office Chair",
          status: "PENDING",
        },
        {
          imgUrl: IMAGE_URL,
          productName: "Smart Watch",
          status: "REJECTED",
        },
        {
          imgUrl: IMAGE_URL,
          productName: "Bluetooth Speaker",
          status: "CONFIRMED",
        },
      ]),
    ]);

    console.log("Database seeded successfully");
    process.exit(0);
  } catch (e) {
    console.log("Error while seeding:", e);
    process.exit(1);
  }
}

main();
