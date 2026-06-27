import { Request, Response } from "express";
import { Booking } from "@/models/booking";
import { Venue } from "@/models/venue.model";
import { Client } from "@/models/client.model";
import { Message } from "@/models/message.model";
import { BookingEnum } from "@/enums/models/booking";

export const getOverview = async (req: Request, res: Response) => {
  try {
    const clientId = req.client?.id;
    console.log("REQ CLIENT:", req.client);
    if (!clientId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const now = new Date();

    const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

    const totalVenues = await Venue.countDocuments({
      clientId,
      isDeleted: false,
    });

    const currentVenues = await Venue.countDocuments({
      clientId,
      isDeleted: false,
      createdAt: { $gte: startOfThisMonth },
    });

    const previousVenues = await Venue.countDocuments({
      clientId,
      isDeleted: false,
      createdAt: {
        $gte: startOfLastMonth,
        $lte: endOfLastMonth,
      },
    });

    const venuesDiff = currentVenues - previousVenues;

    let venuesChange = "";
    if (venuesDiff > 0) {
      venuesChange = `+${venuesDiff} this month`;
    } else if (venuesDiff < 0) {
      venuesChange = `${venuesDiff} this month`;
    } else {
      venuesChange = "No change this month";
    }

    const activeBookings = await Booking.countDocuments({
      clientId,
      status: "approved",
      isDeleted: false,
    });

    const currentBookings = await Booking.countDocuments({
      clientId,
      status: BookingEnum.Approved,
      isDeleted: false,
      createdAt: { $gte: startOfThisMonth },
    });

    const previousBookings = await Booking.countDocuments({
      clientId,
      status: BookingEnum.Approved,
      isDeleted: false,
      createdAt: {
        $gte: startOfLastMonth,
        $lte: endOfLastMonth,
      },
    });

    const bookingsDiff = currentBookings - previousBookings;

    let bookingsChange = "";
    if (bookingsDiff > 0) {
      bookingsChange = `+${bookingsDiff} this month`;
    } else if (bookingsDiff < 0) {
      bookingsChange = `${bookingsDiff} this month`;
    } else {
      bookingsChange = "No change this month";
    }

    const totalClients = await Client.countDocuments({
      isDeleted: false,
    });

    const currentClients = await Client.countDocuments({
      isDeleted: false,
      createdAt: { $gte: startOfThisMonth },
    });

    const previousClients = await Client.countDocuments({
      isDeleted: false,
      createdAt: {
        $gte: startOfLastMonth,
        $lte: endOfLastMonth,
      },
    });

    const clientsDiff = currentClients - previousClients;

    let clientsChange = "";
    if (clientsDiff > 0) {
      clientsChange = `+${clientsDiff} this month`;
    } else if (clientsDiff < 0) {
      clientsChange = `${clientsDiff} this month`;
    } else {
      clientsChange = "No change this month";
    }

    const bookings = await Booking.find({ clientId }).populate("venueId");

    let monthlyRevenue = 0;
    let currentRevenue = 0;
    let previousRevenue = 0;

    bookings.forEach((booking: any) => {
      const venue = booking.venueId;
      const price = Number(venue?.price ?? 0);
      const createdAt = new Date(booking.createdAt);

      monthlyRevenue += price;

      if (createdAt >= startOfThisMonth) {
        currentRevenue += price;
      } else if (createdAt >= startOfLastMonth && createdAt <= endOfLastMonth) {
        previousRevenue += price;
      }
    });

    const revenueChange =
      previousRevenue === 0
        ? "+100% vs last month"
        : `${(
            ((currentRevenue - previousRevenue) / previousRevenue) *
            100
          ).toFixed(0)}% vs last month`;

    const monthlyBookings = await Booking.aggregate([
      {
        $match: {
          clientId,
          isDeleted: false,
          status: BookingEnum.Approved,
        },
      },
      {
        $group: {
          _id: {
            year: { $year: { $toDate: "$date" } },
            month: { $month: { $toDate: "$date" } },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 },
      },
    ]);

    const sampleVenues = await Venue.find({ clientId, isDeleted: false }).limit(
      3,
    );
    console.log(
      "Sample venues with prices:",
      JSON.stringify(sampleVenues, null, 2),
    );

    // const revenueChart = await Booking.aggregate([
    //   {
    //     $match: {
    //       clientId,
    //       isDeleted: false,
    //       status: BookingEnum.Approved,
    //     },
    //   },
    //   {
    //     $lookup: {
    //       from: "venues",
    //       localField: "venueId",
    //       foreignField: "_id",
    //       as: "venue",
    //     },
    //   },
    //   { $unwind: "$venue" },
    //   {
    //     $group: {
    //       _id: {
    //         year: { $year: { $toDate: "$date" } },
    //         month: { $month: { $toDate: "$date" } },
    //       },
    //       totalRevenue: {
    //         $sum: { $toDouble: "$venue.price" },
    //       },
    //     },
    //   },
    //   {
    //     $sort: { "_id.year": 1, "_id.month": 1 },
    //   },
    // ]);

    /************************************************************************************ */
    const bookingsForRevenue = await Booking.find({
      clientId,
      isDeleted: false,
      status: BookingEnum.Approved,
    });

    const venueIds = bookingsForRevenue.map((b) => b.venueId);
    const venues = await Venue.find({ _id: { $in: venueIds } });

    const venuePriceMap = new Map();
    venues.forEach((venue) => {
      let price = 0;
      if (typeof venue.price === "string") {
        price = parseFloat(venue.price) || 0;
      } else if (typeof venue.price === "number") {
        price = venue.price;
      }
      venuePriceMap.set(venue._id.toString(), price);
      console.log(`Venue ${venue.title}: price = ${price}`);
    });

    const revenueMap = new Map();

    bookingsForRevenue.forEach((booking) => {
      const date = new Date(booking.date);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const key = `${year}-${month}`;

      const venueIdString = booking.venueId?.toString();
      const price = venuePriceMap.get(venueIdString) || 0;

      console.log(`Booking for ${booking.date}, price: ${price}`);

      if (!revenueMap.has(key)) {
        revenueMap.set(key, {
          _id: { year, month },
          totalRevenue: 0,
        });
      }
      revenueMap.get(key).totalRevenue += price;
    });

    const revenueChart = Array.from(revenueMap.values());

    console.log("Final revenueChart:", JSON.stringify(revenueChart, null, 2));
    //*************************************************************************************************** */
    const recentBookings = await Booking.find({
      clientId,
      isDeleted: false,
      status: BookingEnum.Approved,
    })
      .populate("venueId")
      // .populate("customerId")
      .sort({ createdAt: -1 })
      .limit(4);
    console.log("Recent bookings:", JSON.stringify(recentBookings, null, 2));

    const recentMessages = await Message.find({ clientId })
      .sort({ createdAt: -1 })
      .limit(2);

    return res.status(200).json({
      cards: {
        totalVenues,
        activeBookings,
        monthlyRevenue,
        totalClients,
        venuesChange,
        bookingsChange,
        revenueChange,
        clientsChange,
      },
      monthlyBookings,
      revenueChart,
      recentBookings,
      recentMessages,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};
