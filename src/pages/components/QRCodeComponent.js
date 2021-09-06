import QRCode from 'qrcode.react';
import React, { useRef, useState } from 'react';

export default function QRCodeComponent(params) {
  const qrRef = useRef();
  const [url, setURL] = useState('');

  function downloadQRCode(e) {
    e.preventDefault();

    //grab what is currently being displayed in the canvas
    let canvas = qrRef.current.querySelector('canvas');
    //set the file format
    let image = canvas.toDataURL('image/png');
    //create an anchor link dynamically
    let anchor = document.createElement('a');
    //set the anchor with an href (our link)
    anchor.href = image;
    //naming the download
    anchor.download = 'qr-code.png';
    //add the anchor then click it to initiate the download
    document.body.appendChild(anchor);
    anchor.click();
    //after download, remove the anchor
    document.body.removeChild(anchor);

    setURL('');
  }

  const qrCode = (
    <QRCode value={url} size={500} bgColor={'#ffffff'} fgColor={'#000000'} />
  );

  return (
    <>
      <form onSubmit={downloadQRCode}>
        <input
          type='text'
          placeholder='enter URL'
          value={url}
          onChange={(e) => setURL(e.target.value)}
        />
        <button type='submit'>Download QR Code</button>
      </form>
      <div ref={qrRef}>{qrCode}</div>
    </>
  );
}
