// Customer Types
export type Customer = {
  _id: string;
  email: string;
  fullName: string;
  phoneNumber?: string;
  gender?: "male" | "female" | "other";
  dob?: Date;
  city?: string;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type CustomerAuthPayload = {
  id: string;
  email: string;
  actorType: "customer";
};

// Auth Types
export type AuthContextType = {
  customer: Customer | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    fullName: string,
    email: string,
    password: string,
  ) => Promise<void>;
  logout: () => Promise<void>;
  verifyToken: () => Promise<void>;
};

// API Response Types
export type ApiResponse<T = any> = {
  data: T;
  message?: string;
  error?: string;
};

export type LoginResponse = {
  token: string;
  customer: Customer;
};

export type RegisterResponse = {
  message: string;
  customer: {
    _id: string;
    email: string;
    fullName: string;
  };
};

export type VerifyResponse = {
  valid: boolean;
  customer: {
    id: string;
    email: string;
    actorType: string;
  };
};

// Venue Types
export type Venue = {
  _id: string;
  name: string;
  description: string;
  location: string;
  capacity: number;
  price: number;
  images: string[];
  availability?: {
    date: string;
    from: string;
    to: string;
  }[];
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type VenueAvailability = {
  date: string;
  from: string;
  to: string;
};

// Booking Types
export type Booking = {
  _id: string;
  venueId: string;
  venueName?: string;
  customerId?: string;
  date: string;
  timePeriod: {
    from: string;
    to: string;
  }[];
  status: "pending" | "confirmed" | "cancelled";
  createdAt: string;
  updatedAt?: string;
};

export type CheckAvailabilityRequest = {
  venueId: string;
  date: string;
  from: string;
  to: string;
};

export type CheckAvailabilityResponse = {
  available: boolean;
  reason?: string;
};

export type CreateBookingRequest = {
  venueId: string;
  date: string;
  timePeriod: {
    from: string;
    to: string;
  }[];
};

// Message Types
export type ChatDirection = "in" | "out";

export type ChatMessage = {
  id: string;
  conversationId: string;
  body: string;
  direction: ChatDirection;
  createdAt: string;
};

export type ConversationSummary = {
  id: string;
  title: string;
  initials: string;
  lastPreview: string;
  lastAtLabel: string;
  unread: boolean;
  isOnline?: boolean;
};

// Navigation Types
export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Main: undefined;
};

export type MainTabParamList = {
  Explore: undefined;
  Bookings: undefined;
  Messages: undefined;
  Profile: undefined;
};
