import React from 'react';
import { ImSpinner2 } from 'react-icons/im';

export default function LoadingSpinner() {
  return (
    <div className='flex flex-row items-center'>
      <p className='px-1 text-xl opacity-90 font-thin'>Loading... </p>
      <ImSpinner2 className='animate-spin text-2xl text-sky-400' />
    </div>
  );
}
