import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "@/pages/login.page";
import { Dashboard } from "@/pages/layout.page";
import { ProtectedRoute } from "@/router/protected.route";
import { AnalyticsPage } from "@/pages/analytics.page";
import { UsersPage } from "@/pages/users.page";
import { ClientsPage } from "@/pages/clients.page";
import { CustomersPage } from "@/pages/customers.page";
import { ListingsPage } from "@/pages/listings.page";
import { ReportsPage } from "@/pages/reports.page";
import { MessagesPage } from "@/pages/messages.page";
import { BookingsPage } from "@/pages/bookings.page";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Navigate to="/dashboard" replace />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="analytics" replace />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="clients" element={<ClientsPage />} />
          <Route path="customers" element={<CustomersPage />} />
          <Route path="listings" element={<ListingsPage />} />
          <Route path="bookings" element={<BookingsPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="messages" element={<MessagesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
