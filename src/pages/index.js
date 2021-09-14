import styles from './styles/Home.module.css';
import QRCodeComponent from './components/QRCodeGeneratorComponent';
import SavedQRCodes from './components/SavedQRCodes';
import Nav from './components/Nav';

export default function Home() {
  return (
    <div className={styles.container}>
      <Nav />
      <QRCodeComponent />
      <SavedQRCodes />
    </div>
  );
}
