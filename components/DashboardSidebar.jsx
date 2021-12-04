import Link from "next/link";
import { useRouter } from "next/router";

const DashboardSidebar = () => {
  const { pathname } = useRouter();

  return (
    <section className="dashboard-sidebar text-lg text-gray-light">
      <div className="profile">
        <Link href="/dashboard/profile">
          <a
            className={`${
              pathname === "/dashboard/profile"
                ? "text-orange font-bold"
                : "text-black-content"
            }`}
          >
            Profile
          </a>
        </Link>
      </div>
      <div className="trips pt-4">
        <Link href="/dashboard/trips">
          <a
            className={`${
              pathname === "/dashboard/trips"
                ? "text-orange font-bold"
                : "text-black-content"
            }`}
          >
            Trips
          </a>
        </Link>
      </div>
      <div className="payments pt-4">
        <Link href="/dashboard/payments">
          <a
            className={`${
              pathname === "/dashboard/payments"
                ? "text-orange font-bold"
                : "text-black-content"
            }`}
          >
            Payments
          </a>
        </Link>
      </div>
    </section>
  );
};

export default DashboardSidebar;
