import React from "react";
import service from "../appwrite backend/service";
import { Link } from "react-router-dom";

function Card({ $id, title, image }) {
  const imageSrc = service.getFilePreview(image);

  return (
    <Link to={`/post/${$id}`}>
      <div className=" bg-gray-100 rounded-xl p-4 ">
        <div className=" justify-center mb-4">
          <img src={imageSrc} alt={title} className="rounded-xl" />
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
}

export default Card;
