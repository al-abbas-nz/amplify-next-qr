import styles from './styles/Home.module.css';
import QRCodeComponent from './components/QRCodeGeneratorComponent';
import SavedQRCodes from './components/SavedQRCodes';
import Nav from './components/Nav';
import { useUserData } from '../lib/hooks';

export default function Home() {
  const { user } = useUserData();
  return (
    <div className={styles.container}>
      <Nav user={user} />
      <QRCodeComponent />
      {/* <SavedQRCodes /> */}
    </div>
  );
}
