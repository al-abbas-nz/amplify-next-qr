import React, { useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import * as mutations from '../../graphql/mutations';
import * as queries from '../../graphql/queries';
import Image from 'next/image';

export default function SavedQRCodes(params) {
  const [savedQRCodes, setSavedQRCodes] = useState([]);

  useEffect(() => {
    async function getQRCodes() {
      const allQRCodes = await API.graphql(
        graphqlOperation(queries.listQRCodes)
      );
      setSavedQRCodes(allQRCodes);
      console.log(allQRCodes);
    }
    getQRCodes();
  }, []);

  return (
    <>
      <h1>Saved QR Codes</h1>
      {savedQRCodes?.data?.listQRCodes?.items?.length == 0 && (
        <p>You have not saved any QR codes.</p>
      )}
      {savedQRCodes?.data?.listQRCodes?.items?.length > 0 && (
        <div>
          <p>hello</p>
          {savedQRCodes.data.listQRCodes.items.map((qr) => (
            <div
              key={qr.id}
              style={{
                margin: '10px',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Image
                src={qr.canvas}
                key={qr.id}
                alt={qr.url}
                height='50'
                width='50'
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
