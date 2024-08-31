import { useState } from "react";
import React from "react";
import service from "../appwrite backend/service";
import { Card, Container } from "../components";

function ShowPosts() {
  const [posts, setPosts] = useState([]);

  service.getArticle([]).then((fetchedPosts) => {
    if (fetchedPosts) {
      setPosts(fetchedPosts.documents);
    }
  });

  return (
    <div className="w-full py-8">
      <Container>
        <div className="w-full flex flex-wrap">
          {posts?.map((post) => (
            <div key={post.$id} className="px-8">
              <Card {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default ShowPosts;
