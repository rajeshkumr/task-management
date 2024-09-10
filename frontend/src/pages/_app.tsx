// _app.tsx
import { AppProps } from 'next/app';
import { TaskProvider } from '../context/TaskContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TaskProvider>
      <Component {...pageProps} />
    </TaskProvider>
  );
}

export default MyApp;
