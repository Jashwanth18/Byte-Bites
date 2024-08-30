import React, { useEffect, useState } from "react";
import { Container, PostForm } from "../components";
import service from "../appwrite backend/service";
import { useParams, useNavigate } from "react-router-dom";

function UpdatePost() {
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  useEffect(() => {
    if (slug) {
      service.getArticle(slug).then((postToEdit) => {
        setPost(postToEdit);
      });
    } else {
      navigate("/");
    }
  }, [navigate, slug]);
  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
}

export default UpdatePost;
