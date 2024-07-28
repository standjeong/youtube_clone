import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { BsYoutube } from 'react-icons/bs';
import { BsSearch } from 'react-icons/bs';

export default function SearchHeader() {
  const nevigate = useNavigate();
  const { keyword } = useParams();
  const [input, setInput] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    nevigate(`/videos/${input}`);
  };

  useEffect(() => setInput(keyword || ''), [keyword]);

  return (
    <header className='w-full flex py-4 px-4'>
      <Link to='/' className='flex items-center'>
        <BsYoutube className='text-brand text-3xl mr-1' />
        <h1 className='text-3xl font-medium tracking-tighter pb-1'>Youtube</h1>
      </Link>
      <form className='flex w-full justify-center' onSubmit={handleSubmit}>
        <input
          className='sm:w-3/5 max-w-md outline-0 border border-r-0 rounded-l-full px-3 py-1 text-lg'
          placeholder='검색'
          type='text'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className='border rounded-r-full px-4' type='submit'>
          <BsSearch />
        </button>
      </form>
    </header>
  );
}
