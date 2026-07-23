import AdminNotificationForm from "@/components/admin/AdminNotificationForm";

export default function AdminNotificationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black">Notifications Management</h1>
        <p className="mt-1 text-gray-500">
          Send announcements, promotional offers, or system alerts to your customers.
        </p>
      </div>

      <AdminNotificationForm />
    </div>
  );
}
