import { useState } from "react";
import React from "react";
import service from "../appwrite backend/service";
import { Card } from "../components";

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
        <div className="flex flex-wrap">
          {posts?.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <Card post={post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default ShowPosts;
