import Icon from "../../components/common/Icon";
import { getRequest } from "../../actions/connection";
import WaypalFooter from "../../components/WaypalFooter";
import DashboardSidebar from "../../components/DashboardSidebar";
import Button from "../../components/common/Button";
import { useRouter } from "next/router";
import moment from "moment";

let transactions = require("../../assets/data/transactions.json");

const Payments = ({ payments }) => {
  const { push } = useRouter();
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
                          {moment(transaction.createdAt).format("YYYY-MM-DD")}
                        </p>
                      </div>
                    </div>
                    <div className="location text-gray-light">
                      <p>{transaction.trip.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="pt-24 md:flex justify-between max-w-3xl">
            <div>
              <h1 className="text-2xl md:text-5xl font-circular-bold text-black-light">
                No transactions...yet 👀
              </h1>
              <p className="md:text-2xl max-w-sm pt-4">
                Transactions for trips that you joined will show here.
              </p>
              <div className="pt-7">
                <Button
                    key={2}
                    onClick={() => {
                      push("/search")
                    }}
                    btnText="Explore trips"
                    btnStyle="mr-6 bg-orange text-white px-4 py-2 rounded"
                  />
              </div>
            </div>
            <div className="hidden md:block">
              <Icon icon="money-bag" />
            </div>
          </div>       
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
