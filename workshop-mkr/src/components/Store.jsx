import React, { useEffect, useState } from 'react';

export const Posts = ({ name, date }) => {
  const [posts, setPosts] = useState([]);

  console.log('Mounted');

  const handleRequest = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.cx/posts');
      const data = await response.json();
      console.log({ data });
    } catch (error) {
      console.log('error async / await ', error.message);
    }
  };

  useEffect(() => {
    const handleRequest = async () => {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setPosts(data);
        console.log({ data });
        console.log('useEffect');
    };
    handleRequest();
    return () => {
      console.log('Unmounted');
    };
  }, []);

  //   setTimeout(() => {
  //     setPosts([
  //       { id: 1, title: 'Post 1' },
  //       { id: 2, title: 'Post 2' },
  //       { id: 3, title: 'Post 3' },
  //     ]);
  //   }, 5000);

  if (posts.length === 0) return <div>Loading...</div>;

  return (
    <div style={{display:"Flex", justifyContent: "center", flexWrap: "wrap", gap: "2rem", padding: "5rem"}}>
      Posts
      {posts.map((post) => (
        <div className="card" style={{width: 18 + "rem"}} key={post.id}>
        <img src={post.image} className="card-img-top" style={{width: 13 + "rem"}} alt="..."/>
        <div className="card-body">
          <h5 className="card-title">{post.title}</h5>
          <p className="card-text">{post.description}</p>
          <a href="#" className="btn btn-primary">${post.price}</a>
        </div>
      </div>
      ))}
    </div>
  );
};