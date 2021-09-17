import { API, graphqlOperation } from 'aws-amplify';
import * as mutations from '../../graphql/mutations';
import * as queries from '../../graphql/queries';
import { useRouter } from 'next/dist/client/router';
import QRCode from 'qrcode.react';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/dist/client/image';

export default function QRCodeComponent(params) {
  const router = useRouter();
  const qrRef = useRef();
  const [url, setURL] = useState('');
  const [saved, setSaved] = useState(false);

  const [loading, setLoading] = useState(false);
  const [qrCodes, setQrCodes] = useState([]);
  const [apiError, setApiError] = useState();

  useEffect(() => {
    fetchQRCodes();
  }, []);

  async function fetchQRCodes() {
    setLoading(true);
    try {
      const qrCodesRequest = await API.graphql(
        graphqlOperation(queries.listQRCodes)
      );
      const qrCodes = qrCodesRequest.data.listQRCodes.items;
      setQrCodes(qrCodes);
      setApiError(null);
    } catch (error) {
      console.error('failed to fetch QR Codes: ', error);
      setApiError(error);
    } finally {
      setLoading(false);
    }
  }

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

    const qrDetails = {
      url,
      title: url,
      canvas: anchor.href,
    };

    try {
      await API.graphql(
        graphqlOperation(mutations.createQRCode, { input: qrDetails })
      );
      setQrCodes([...qrCodes, qrDetails]);
    } catch (error) {
      throw new Error(error);
    }
  }

  async function handleDelete(qr) {
    const qrDetails = { id: qr?.id, _version: qr?._version };

    const confirmBox = window.confirm(
      'Do you really want to delete this Crumb?'
    );

    if (confirmBox === true) {
      try {
        await API.graphql(
          graphqlOperation(mutations.deleteQRCode, { input: qrDetails })
        );
        setQrCodes(qrCodes.filter((qr) => qr.id !== qrDetails.id));
      } catch (error) {
        throw new Error(error);
      }
    }
  }

  const qrCode = (
    <QRCode value={url} size={500} bgColor={'#ffffff'} fgColor={'#000000'} />
  );

  const savedQRCodes = (
    <>
      <h2>Saved QR Codes</h2>
      {!qrCodes && <p>You have not saved any QR codes.</p>}
      {qrCodes && (
        <div>
          {qrCodes
            ?.filter((qr) => !qr._deleted)
            .map((qr) => (
              <div
                key={qr.id}
                style={{
                  margin: '10px',
                  display: 'flex',
                  justifyContent: 'space-around',
                }}
              >
                <h1>{qr.url}</h1>

                <Image
                  src={qr.canvas}
                  key={qr.id}
                  alt={qr.url}
                  height='50'
                  width='50'
                />
                <button onClick={() => handleDelete(qr)}>delete</button>
              </div>
            ))}
        </div>
      )}
    </>
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
      <div>{savedQRCodes}</div>
    </>
  );
}
