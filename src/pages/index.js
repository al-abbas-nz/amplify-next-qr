import styles from './styles/Home.module.css';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../aws-exports';

Amplify.configure(awsconfig);

import QRCodeComponent from './components/QRCodeGeneratorComponent';
import SavedQRCodes from './components/SavedQRCodes';

export default function Home() {
  return (
    <div className={styles.container}>
      <QRCodeComponent />
      <SavedQRCodes />
    </div>
  );
}
