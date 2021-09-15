import { API, graphqlOperation } from '@aws-amplify/api';
import { useRouter } from 'next/dist/client/router';
import QRCode from 'qrcode.react';
import React, { useRef, useState } from 'react';

import * as mutations from '../../graphql/mutations';

export default function QRCodeComponent(params) {
  const router = useRouter();
  const qrRef = useRef();
  const [url, setURL] = useState('');

  function downloadImageLogic() {
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
  }

  function downloadQRCode(e) {
    e.preventDefault();
    downloadImageLogic();
  }

  async function saveQRCodeToAmplify(e) {
    e.preventDefault();
    //grab what is currently being displayed in the canvas
    let canvas = qrRef.current.querySelector('canvas');
    //set the file format
    let image = canvas.toDataURL('image/png');
    //create an anchor link dynamically
    let anchor = document.createElement('a');
    //set the anchor with an href (our link)
    anchor.href = image;
    console.log(anchor.href);

    const qrDetails = {
      url,
      title: url,
      canvas: anchor.href,
    };

    try {
      await API.graphql(
        graphqlOperation(mutations.createQRCode, { input: qrDetails })
      );
      router.push('/');
    } catch (error) {
      throw new Error(error);
    }
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
      <form onSubmit={saveQRCodeToAmplify}>
        <button type='submit'>Save QR Code</button>
      </form>
      <div ref={qrRef}>{qrCode}</div>
    </>
  );
}
