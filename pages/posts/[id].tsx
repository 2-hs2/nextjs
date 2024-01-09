import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import React from "react";

import homeStyles from "../../styles/Home.module.css";

import { getAllPostIds, getPostData } from "../../lib/posts";

const Post = ({
  postData,
}: {
  postData: {
    title: string;
    date: string;
    contentHtml: string;
  };
}) => {
  return (
    <div>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1>{postData.title}</h1>
        <div>{postData.date}</div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </div>
  );
};

export default Post;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds(); // posts.ts에 존재하는 함수
  // [ { params: {  id: 'pre-rendering' } }, { params: { id: 'ssg-ssr' } } ]
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params.id as string); // type assertion으로 params.id가 string임을 명시
  return {
    props: {
      postData,
    },
  };
};
