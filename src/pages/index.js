import styles from './styles/Home.module.css';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../aws-exports';

Amplify.configure(awsconfig);

import QRCodeComponent from './components/QRCodeComponent';

export default function Home() {
  return (
    <div className={styles.container}>
      <QRCodeComponent />
    </div>
  );
}
