import "bootstrap/dist/css/bootstrap.min.css";
import "../style/index.css";
import { store } from '../redux/store'
import { Provider } from "react-redux";
import Layout from './layout'

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </>

  )
}
