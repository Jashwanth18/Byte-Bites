import React from "react";
import { useCallback } from "react";
import { Button, Select, Input, RTE } from "./index";
import service from "../appwrite backend/service";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function PostForm({ post }) {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const { watch, setValue, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || "",
      content: post?.content || "",
      slug: post?.slug || "",
      status: post?.status || "active",
    },
  });

  const handlePostSubmit = async (postData) => {
    let savedPost = null;
    const newImage = postData.image[0]
      ? service.uploadFile(postData.image[0])
      : null;

    if (post) {
      if (newImage) {
        await service.deleteFile(post.image);
      }

      savedPost = await service.updateArticle(post.$id, {
        ...postData,
        image: newImage ? newImage.$id : null,
      });
    } else {
      savedPost = await service.createArticle({
        ...postData,
        image: newImage ? newImage.$id : null,
        userId: userData.$id,
      });

      if (savedPost) {
        navigate(`/post/${savedPost.$id}`);
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/^[a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    }
    return "";
  }, []);

  useEffect(() => {
    const watchTitle = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform)(value.title, { shouldValidate: true });
      }
    });

    return () => {
      watchTitle.unsubscribe();
    };
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handlePostSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={service.getFilePreview(post.image)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : "bg-blue-500"}
          className="w-full"
        >
          {post ? "Update" : "Create"}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;
