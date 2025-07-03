import Layout from "@/components/layout";
import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";

function App({ Component, pageProps }) {
  console.log(`App is starting: ${JSON.stringify(pageProps)}`)
  return (
    <>
      <Layout></Layout>
      <Component {...pageProps} />
    </>
  );
}

export default App;

