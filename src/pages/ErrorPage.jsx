import React from 'react';
import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  console.log(error);
  return (
    <div>
      <p>에러 발생📃</p>
      <p>{error.statusText || error.message}</p>
    </div>
  );
}
