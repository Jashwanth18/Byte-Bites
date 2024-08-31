import React, { useState, useEffect } from "react";
import { Container, Card } from "../components";
import service from "../appwrite backend/service";

function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    service.getArticles([]).then((fetchedPosts) => {
      if (fetchedPosts) {
        setPosts(fetchedPosts.documents);
      }
    });
  }, []);

  if (!posts.length) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                No posts to show!
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  } else {
    return (
      <div className="w-full py-8">
        <Container>
          <div className="flex flex-wrap">
            {posts?.map((post) => (
              <div key={post.$id} className="p-2 w-1/4">
                <Card {...post} />
              </div>
            ))}
          </div>
        </Container>
      </div>
    );
  }
}

export default Home;
