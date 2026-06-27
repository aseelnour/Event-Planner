// C:\Users\Osaid\GFA\event-planner\apps\aseel\backend\src\routes\auth.routes.ts
import { Router } from "express";
import mongoose from "mongoose";
import { requireCustomerAuth } from "../middleware/require-customer-auth.middleware";
import { validateRequest } from "../middleware/validate-request.middleware";
import { customerLogin } from "../services/auth.services";
import { CustomerLoginSchema } from "../validation/customer-auth.schemas";
import { registerCustomer } from "../services/register.service";
import { CustomerRegisterSchema } from "../validation/customer-register.schemas";
import { Venue } from "../models/venue.model";
import { Booking } from "../models/booking.model";
import { Customer } from "../models/customer.model";
import { BookingEnum } from "../models/booking.model";
import { Message } from "../models/message.model";

const router = Router();

// ============================================================
// 1. مسارات المصادقة (Auth)
// ============================================================

router.post(
  "/register",
  validateRequest({ body: CustomerRegisterSchema }),
  async (req, res) => {
    try {
      const result = await registerCustomer(req.body);
      res.status(201).json({ message: "Registration successful", ...result });
    } catch (error: any) {
      res.status(409).json({ error: error.message });
    }
  },
);

router.post(
  "/login",
  validateRequest({ body: CustomerLoginSchema }),
  async (req, res) => {
    try {
      const result = await customerLogin(req.body.email, req.body.password);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  },
);

router.get("/verify", requireCustomerAuth, (req, res) => {
  res.status(200).json({ valid: true, customer: req.customer });
});

// ============================================================
// 2. مسارات الفعاليات (Venues)
// ============================================================

router.get("/venues", async (req, res) => {
  try {
    const venues = await Venue.find({ isDeleted: false });
    res.status(200).json(venues);
  } catch (error) {
    console.error("❌ Error fetching venues:", error);
    res.status(500).json({ error: "Failed to fetch venues" });
  }
});

router.get("/venues/:id", async (req, res) => {
  try {
    const venue = await Venue.findOne({ _id: req.params.id, isDeleted: false });
    if (!venue) {
      return res.status(404).json({ error: "Venue not found" });
    }
    res.status(200).json(venue);
  } catch (error) {
    console.error("❌ Error fetching venue:", error);
    res.status(500).json({ error: "Failed to fetch venue" });
  }
});

// ============================================================
// 3. مسارات الحجوزات (Bookings)
// ============================================================

router.get("/bookings", requireCustomerAuth, async (req, res) => {
  try {
    console.log("👤 Customer from request:", req.customer);
    console.log("🆔 Customer ID:", req.customer?.id);

    if (!req.customer?.id) {
      return res.status(401).json({ error: "Unauthorized: No customer ID" });
    }

    const bookings = await Booking.find({
      customerId: req.customer.id,
      isDeleted: false,
    }).sort({ createdAt: -1 });

    console.log(`📊 Found ${bookings.length} bookings`);

    const formattedBookings = bookings.map((b) => ({
      ...b.toObject(),
      date: b.date.toISOString().split("T")[0],
    }));

    res.status(200).json(formattedBookings);
  } catch (error) {
    console.error("❌ Error fetching bookings:", error);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

router.post("/bookings", requireCustomerAuth, async (req, res) => {
  try {
    const { venueId, date, timePeriod } = req.body;

    if (!req.customer?.id) {
      return res.status(401).json({ error: "Unauthorized: No customer ID" });
    }

    const venue = await Venue.findOne({ _id: venueId, isDeleted: false });
    if (!venue) {
      return res.status(404).json({ error: "Venue not found" });
    }

    const existingBooking = await Booking.findOne({
      venueId,
      date: new Date(date),
      isDeleted: false,
      $or: timePeriod.map((period: { from: string; to: string }) => ({
        "timePeriod.from": { $lt: period.to },
        "timePeriod.to": { $gt: period.from },
      })),
    });

    if (existingBooking) {
      return res.status(409).json({ error: "Time slot already booked" });
    }

    const booking = await Booking.create({
      clientId: venue.clientId,
      customerId: req.customer.id,
      venueId,
      date: new Date(date),
      timePeriod,
      status: BookingEnum.PENDING,
    });

    res.status(201).json({
      ...booking.toObject(),
      date: booking.date.toISOString().split("T")[0],
    });
  } catch (error) {
    console.error("❌ Error creating booking:", error);
    res.status(500).json({ error: "Failed to create booking" });
  }
});

router.delete("/bookings/:id", requireCustomerAuth, async (req, res) => {
  try {
    if (!req.customer?.id) {
      return res.status(401).json({ error: "Unauthorized: No customer ID" });
    }

    const booking = await Booking.findOne({
      _id: req.params.id,
      customerId: req.customer.id,
      isDeleted: false,
    });

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    booking.isDeleted = true;
    await booking.save();

    res.status(200).json({ message: "Booking cancelled successfully" });
  } catch (error) {
    console.error("❌ Error cancelling booking:", error);
    res.status(500).json({ error: "Failed to cancel booking" });
  }
});

// ============================================================
// 4. مسارات البروفايل (Profile)
// ============================================================

router.get("/profile", requireCustomerAuth, async (req, res) => {
  try {
    if (!req.customer?.id) {
      return res.status(401).json({ error: "Unauthorized: No customer ID" });
    }

    const customer = await Customer.findOne({
      _id: req.customer.id,
      isDeleted: false,
    }).select("-password");

    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    res.status(200).json({
      _id: customer._id,
      email: customer.email,
      fullName: customer.fullName,
      phoneNumber: customer.phoneNumber || "Not provided",
      city: customer.city || "Not provided",
      gender: customer.gender,
      dob: customer.dob,
    });
  } catch (error) {
    console.error("❌ Profile error:", error);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

router.put("/profile", requireCustomerAuth, async (req, res) => {
  try {
    if (!req.customer?.id) {
      return res.status(401).json({ error: "Unauthorized: No customer ID" });
    }

    const { fullName, phoneNumber, city, gender, dob } = req.body;

    const customer = await Customer.findOneAndUpdate(
      { _id: req.customer.id, isDeleted: false },
      {
        fullName,
        phoneNumber,
        city,
        gender,
        dob: dob ? new Date(dob) : undefined,
      },
      { new: true },
    ).select("-password");

    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    res.status(200).json({
      _id: customer._id,
      email: customer.email,
      fullName: customer.fullName,
      phoneNumber: customer.phoneNumber || "Not provided",
      city: customer.city || "Not provided",
      gender: customer.gender,
      dob: customer.dob,
    });
  } catch (error) {
    console.error("❌ Update profile error:", error);
    res.status(500).json({ error: "Failed to update profile" });
  }
});

// ============================================================
// 5. مسارات الشات (Messages) - المستخدمة في التطبيق
// ============================================================

// 5.1 جلب جميع المحادثات (Conversations)
router.get("/chat/conversations", requireCustomerAuth, async (req, res) => {
  try {
    const customerId = req.customer?.id;

    if (!customerId) {
      return res.status(401).json({ error: "Unauthorized: No customer ID" });
    }

    console.log(`📡 Fetching conversations for customer: ${customerId}`);

    const messages = await Message.find({
      senderId: customerId,
      isDeleted: false,
    }).sort({ timestamp: -1 });

    console.log(`📊 Found ${messages.length} messages`);

    const threadsMap = new Map();

    for (const msg of messages) {
      // ✅ استخدام venueId بدلاً من threadId
      const venueId = msg.venueId?.toString() || msg.threadId?.toString();

      if (!venueId) {
        console.warn(`⚠️ Skipping message with missing venueId:`, msg._id);
        continue;
      }

      if (!threadsMap.has(venueId)) {
        // ✅ البحث عن الصالة باستخدام venueId
        const venue = await Venue.findOne({
          _id: venueId,
          isDeleted: false,
        });

        const venueName = venue?.title || "Event Venue";

        threadsMap.set(venueId, {
          id: venueId,
          title: venueName,
          initials: venueName?.charAt(0)?.toUpperCase() || "V",
          lastPreview: msg.message || "No message",
          lastAtLabel: getTimeAgo(msg.timestamp || msg.createdAt),
          unread: false,
          isOnline: false,
        });
      }
    }

    const conversations = Array.from(threadsMap.values());
    console.log(`✅ Returning ${conversations.length} conversations`);

    res.json(conversations);
  } catch (error: any) {
    console.error("❌ Error fetching conversations:", error);
    res.status(500).json({ error: error.message });
  }
});

// 5.2 جلب رسائل محادثة معينة
router.get("/chat/messages/:venueId", requireCustomerAuth, async (req, res) => {
  try {
    const { venueId } = req.params;
    const customerId = req.customer?.id;

    if (!customerId) {
      return res.status(401).json({ error: "Unauthorized: No customer ID" });
    }

    console.log(`📡 Fetching messages for venue: ${venueId}`);

    // ✅ البحث عن الرسائل باستخدام venueId
    let messages = await Message.find({
      venueId: venueId,
      isDeleted: false,
    }).sort({ timestamp: 1 });

    // إذا لم يتم العثور على رسائل باستخدام venueId، جرب threadId
    if (messages.length === 0) {
      messages = await Message.find({
        threadId: venueId,
        isDeleted: false,
      }).sort({ timestamp: 1 });
    }

    console.log(`📊 Found ${messages.length} messages`);

    const formattedMessages = messages.map((msg) => {
      const senderId = msg.senderId?.toString() || "";

      return {
        _id: msg._id,
        venueId: venueId,
        body: msg.message || "",
        direction: senderId === customerId ? "out" : "in",
        createdAt: msg.timestamp || msg.createdAt || new Date(),
      };
    });

    res.json(formattedMessages);
  } catch (error: any) {
    console.error("❌ Error fetching messages:", error);
    res.status(500).json({ error: error.message });
  }
});

// 5.3 إرسال رسالة جديدة
router.post("/chat/messages", requireCustomerAuth, async (req, res) => {
  try {
    const { venueId, body } = req.body;
    const customerId = req.customer?.id;

    if (!customerId) {
      return res.status(401).json({ error: "Unauthorized: No customer ID" });
    }

    if (!venueId || !body || !body.trim()) {
      return res
        .status(400)
        .json({ error: "Venue ID and message body are required" });
    }

    console.log(
      `📤 Sending message from ${customerId} to venue ${venueId}: ${body}`,
    );

    // ✅ إنشاء رسالة مع venueId
    const newMessage = await Message.create({
      senderId: customerId,
      threadId: venueId,
      venueId: venueId,
      actorType: "customer",
      message: body.trim(),
      timestamp: new Date(),
      status: "sent",
      isDeleted: false,
    });

    console.log(`✅ Message sent successfully`);

    const formattedMessage = {
      _id: newMessage._id,
      venueId: venueId,
      body: newMessage.message,
      direction: "out",
      createdAt: newMessage.timestamp || newMessage.createdAt,
    };

    res.status(201).json(formattedMessage);
  } catch (error: any) {
    console.error("❌ Error sending message:", error);
    res.status(500).json({ error: error.message });
  }
});

// ============================================================
// 6. مسارات الشات القديمة (للتوافق مع الإصدارات السابقة)
// ============================================================

// 6.1 جلب جميع المحادثات (طريقة قديمة)
router.get("/customer/:customerId", async (req, res) => {
  try {
    const { customerId } = req.params;

    const messages = await Message.find({
      senderId: customerId,
      isDeleted: false,
    }).sort({ timestamp: -1 });

    const threadsMap = new Map();

    for (const msg of messages) {
      // ✅ استخدام venueId بدلاً من threadId
      const venueId = msg.venueId?.toString() || msg.threadId?.toString();

      if (!venueId) {
        continue;
      }

      if (!threadsMap.has(venueId)) {
        const venue = await Venue.findOne({
          _id: venueId,
          isDeleted: false,
        });

        const venueName = venue?.title || "Event Venue";

        threadsMap.set(venueId, {
          _id: venueId,
          receiverId: {
            fullName: venueName,
          },
          lastMessage: {
            message: msg.message || "No message",
            timestamp: msg.timestamp || msg.createdAt || new Date(),
          },
          unreadCount: 0,
        });
      }
    }

    res.json(Array.from(threadsMap.values()));
  } catch (error: any) {
    console.error("❌ Error fetching conversations (legacy):", error);
    res.status(500).json({ error: error.message });
  }
});

// 6.2 جلب رسائل ثريد (طريقة قديمة)
router.get("/thread/:threadId", async (req, res) => {
  try {
    const { threadId } = req.params;

    // ✅ البحث باستخدام venueId أو threadId
    let messages = await Message.find({
      venueId: threadId,
      isDeleted: false,
    }).sort({ timestamp: 1 });

    if (messages.length === 0) {
      messages = await Message.find({
        threadId: threadId,
        isDeleted: false,
      }).sort({ timestamp: 1 });
    }

    const formattedMessages = messages.map((msg) => ({
      _id: msg._id,
      senderId: msg.senderId?.toString() || "",
      threadId: msg.threadId?.toString() || "",
      venueId: msg.venueId?.toString() || "",
      message: msg.message || "",
      timestamp: msg.timestamp || msg.createdAt || new Date(),
    }));

    res.json(formattedMessages);
  } catch (error: any) {
    console.error("❌ Error fetching thread messages (legacy):", error);
    res.status(500).json({ error: error.message });
  }
});

// 6.3 جلب رسائل ثريد معين (طريقة جديدة مع /messages)
router.get("/thread/:threadId/messages", async (req, res) => {
  try {
    const { threadId } = req.params;

    // ✅ البحث باستخدام venueId أو threadId
    let messages = await Message.find({
      venueId: threadId,
      isDeleted: false,
    }).sort({ timestamp: 1 });

    if (messages.length === 0) {
      messages = await Message.find({
        threadId: threadId,
        isDeleted: false,
      }).sort({ timestamp: 1 });
    }

    const formattedMessages = messages.map((msg) => ({
      _id: msg._id,
      senderId: msg.senderId?.toString() || "",
      threadId: msg.threadId?.toString() || "",
      venueId: msg.venueId?.toString() || "",
      message: msg.message || "",
      timestamp: msg.timestamp || msg.createdAt || new Date(),
    }));

    res.json(formattedMessages);
  } catch (error: any) {
    console.error("❌ Error fetching thread messages:", error);
    res.status(500).json({ error: error.message });
  }
});

// 6.4 إرسال رسالة جديدة (طريقة قديمة)
router.post("/customer", async (req, res) => {
  try {
    const { customerId, threadId, message } = req.body;

    if (!customerId || !threadId || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newMessage = await Message.create({
      senderId: customerId,
      threadId: threadId,
      venueId: threadId,
      actorType: "customer",
      message: message,
      timestamp: new Date(),
      status: "sent",
      isDeleted: false,
    });

    res.status(201).json(newMessage);
  } catch (error: any) {
    console.error("❌ Error sending message (legacy):", error);
    res.status(500).json({ error: error.message });
  }
});

// ============================================================
// 7. دالة مساعدة لتنسيق الوقت
// ============================================================

function getTimeAgo(date: Date | undefined | null): string {
  if (!date) {
    return "Just now";
  }

  const now = new Date();
  const diff = now.getTime() - new Date(date).getTime();

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m`;
  if (hours < 24) return `${hours}h`;
  if (days < 7) return `${days}d`;
  return new Date(date).toLocaleDateString();
}

// ============================================================
// 8. تصدير الـ Router
// ============================================================

export const customerAuthRoutes = router;
