import React, { useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import * as mutations from '../../graphql/mutations';
import * as queries from '../../graphql/queries';
import Image from 'next/image';
import { useRouter } from 'next/dist/client/router';

export default function SavedQRCodes(params) {
  const router = useRouter();
  const [savedQRCodes, setSavedQRCodes] = useState([]);

  useEffect(() => {
    (async () => {
      const allQRCodes = await API.graphql(
        graphqlOperation(queries.listQRCodes)
      );
      setSavedQRCodes(allQRCodes);
      console.log(
        savedQRCodes?.data?.listQRCodes?.items?.filter((qr) => !qr._deleted)
      );
    })();
  }, []);

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
        router.push('/');
      } catch (error) {
        throw new Error(error);
      }
    }
  }

  return (
    <>
      <h2>Saved QR Codes</h2>
      {savedQRCodes?.data?.listQRCodes?.items?.length == 0 && (
        <p>You have not saved any QR codes.</p>
      )}
      {savedQRCodes?.data?.listQRCodes?.items?.length > 0 && (
        <div>
          {savedQRCodes.data.listQRCodes.items
            .filter((qr) => !qr._deleted)
            .map((qr) => (
              <div
                key={qr.id}
                style={{
                  margin: '10px',
                  display: 'flex',
                  justifyContent: 'space-between',
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
