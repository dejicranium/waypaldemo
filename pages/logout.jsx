import { destroyCookie } from "nookies";

export default function Page() {
  return <></>;
}

export const getServerSideProps = async (ctx) => {
  destroyCookie(ctx, "token");

  return {
    redirect: {
      permanent: false,
      destination: "/",
    },
  };
};
