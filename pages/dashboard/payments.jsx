import Icon from "../../components/common/Icon";
import { getRequest } from "../../actions/connection";
import WaypalFooter from "../../components/WaypalFooter";
import DashboardSidebar from "../../components/DashboardSidebar";

let transactions = require("../../assets/data/transactions.json");

const Payments = ({ payments }) => {
  return (
    <>
      <div className="container md:grid grid-cols-7 mt-14">
        <aside className="hidden md:block col-span-1">
          <DashboardSidebar />
        </aside>

        <section className="payments-history col-span-6 md:ml-40">
          {payments.length > 0 ? (
            <div className="">
              <h1 className="text-2xl font-circular-bold">
                {payments.length}{" "}
                {`${payments.length === 1 ? " Payment" : "Payments"}`}
              </h1>
              <div className="divide-y divide-gray-light3 divide">
                {payments.map((transaction, i) => (
                  <div
                    className="transactions flex items-center justify-between py-6"
                    key={i}
                  >
                    <div className="flex items-center">
                      <Icon icon="successful" />
                      <div className="transaction-details pl-4 pr-10">
                        <p className="amount text-black-content font-bold">
                          ${transaction.amount}
                        </p>
                        <p className="date text-xs text-gray-light">
                          {transaction.date}
                        </p>
                      </div>
                    </div>
                    <div className="location text-gray-light">
                      <p>{transaction.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <h1>No transactions available</h1>
          )}
        </section>
      </div>
      <WaypalFooter />
    </>
  );
};

export default Payments;

export async function getServerSideProps({ req: { cookies } }) {
  const ngrok_base = "http://6c7c-197-210-8-123.ngrok.io/api/v1";
  const payments = await getRequest(`${process.env.NEXT_PUBLIC_API_LOCATION}/payment`, cookies.token);

  if (payments.status) {
    return {
      props: {
        payments: payments.data,
      },
    };
  }
  return {
    props: {
      payments: [],
    },
  };
}
