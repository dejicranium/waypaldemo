import NProgress from "nprogress";
import Router from "next/router";
import Script from "next/script";
import Head from 'next/head'


import Layout from "../components/Layout";
import { DataProvider } from "../components/hooks/useData";

import "../styles/globals.css";
import "nprogress/nprogress.css";
import "react-intl-tel-input/dist/main.css";
import "react-datetime/css/react-datetime.css";
Router.events.on("routeChangeError", () => NProgress.done());
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>WayPal - Join and create exciting group tours and trips</title>
        
      </Head>
      <Script src="https://checkout.flutterwave.com/v3.js" />
      <Script src="/crispchat-integration.js" type="text/javascript" />
      <Script src="/disable-crip.js" type="text/javascript" />
      <Script id='places-api' src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDLZ4NFeub25kppPsgPItK0RWKdZ-Ecy8c&libraries=places" type="text/javascript" />
            {/*
        <Script src="/places-integration.js" type="text/javascript" />*/}
      <DataProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </DataProvider>
    </>
  );
}

export default MyApp;
