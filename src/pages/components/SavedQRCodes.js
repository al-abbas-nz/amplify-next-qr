import React, { useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import * as mutations from '../../graphql/mutations';
import * as queries from '../../graphql/queries';
import Image from 'next/image';
import { useRouter } from 'next/dist/client/router';

export default function SavedQRCodes(params) {
  const router = useRouter();
  const [savedQRCodes, setSavedQRCodes] = useState([]);
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

  async function handleDelete(qr) {
    const qrDetails = { id: qr?.id, _version: qr?._version };

    const confirmBox = window.confirm(
      'Do you really want to delete this Crumb?'
    );

    if (confirmBox === true) {
      try {
        console.log(qrDetails);

        await API.graphql(
          graphqlOperation(mutations.deleteQRCode, { input: qrDetails })
        );
      } catch (error) {
        throw new Error(error);
      }
    }
  }

  if (apiError) return <div>failed to load</div>;
  if (!qrCodes) return <div>loading...</div>;
  return (
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
}
