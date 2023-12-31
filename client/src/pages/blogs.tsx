import { useEffect, useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../components/card';
import API from '../utils/axios';

interface Blog {
  _id: number;
  heading: string;
  body: string;
  createdAt: Date;
}

function Blogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await API.get('/blogs');
        console.log('Fetched data:', res.data);
        setBlogs(res.data as Blog[]);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };
    fetchBlogs().catch((error) =>
      console.error('Error fetching blogs:', error)
    );
  }, []);

  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/add-blog');
  };

  return (
    <div className=' bg-[#f4f7fa]'>
      <div className='bg-blue-400/70 text-4xl py-10 flex flex-col gap-y-4 justify-center items-center w-screen '>
        <span className='text-xl font-sans font-bold tracking-wide'>
          The Blog : Sharing Stories, Thoughts & Ideas
        </span>
        <button
          className='text-white rounded-full drop-shadow-2xl'
          onClick={handleClick}
        >
          <FaPlusCircle />
        </button>
      </div>

      {/* blog cards */}
      <div className='grid grid-cols-1 md:grid-cols-3  gap-8 px-20 md:px-32 py-12 md:py-16'>
        {blogs.map((blog) => {
          return (
            <Link to={`/blogs/${blog._id}`}>
              <Card
                key={blog._id}
                heading={blog.heading}
                createdAt={new Date(blog.createdAt).toLocaleString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
export default Blogs;
