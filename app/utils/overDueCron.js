const Checkout = require("../models/Checkout");
const cron = require("node-cron");

cron.schedule("0 0 * * *", async () => {
  try {
    const overdueCheckouts = await Checkout.find({
      status: "issued",
      returnDate: { $lt: new Date() },
    });

    overdueCheckouts.forEach(async (checkout) => {
      checkout.lateReturnFine += 10;
      await checkout.save();
    });
  } catch (error) {
    console.error("Cron job error:", error);
  }
});
