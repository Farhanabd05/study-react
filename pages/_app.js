// pages/_app.js
import { ReadLaterProvider } from '../context/ReadLaterContext';

console.log('ReadLaterProvider:', ReadLaterProvider);

function MyApp({ Component, pageProps }) {
  if (!ReadLaterProvider) {
    return <div>Error: ReadLaterProvider tidak terdefinisi</div>;
  }
  return (
    <ReadLaterProvider>
      <Component {...pageProps} />
    </ReadLaterProvider>
  );
}

export default MyApp;