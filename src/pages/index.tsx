import Head from 'next/head'
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { getPosts, postType } from '../services/content'
import { Layout } from '../components/Layout'
import { PostCard } from '../components/PostCard'

type Props = {
  posts: postType[]
}

export default function Home({posts: originalPosts}: Props) {

  const [highlightedPost, ...posts] = originalPosts;

  const router = useRouter();

  const handleHighlightedPostClick = useCallback(() =>{
      router.push(`/post/${highlightedPost.sys.id}`)
  }, [])

  return (
    <div>
      <Head>
        <title>News | Coders Blog</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-4/5 m-auto bg-white mt-[-42PX] rounded-tl-[1.875rem] min-h-[21.5rem] p-6 flex flex-wrap-reverse justify-around cursor-pointer" onClick={handleHighlightedPostClick}>
        <div className="w-[38.75rem] max-h-80">
          <h2 className="font-bold text-[#232323] text-2xl mg-[0.625rem]">{highlightedPost.fields.title}</h2>

          <p className="text-lg">{highlightedPost.fields.description}</p>
        </div>
        <div className="w-[35.625rem] max-h-80" >
          <img alt="Thumbnail" src={highlightedPost.fields.thumbnail.fields.file.url} className="w-full h-full object-cover rounded hover:opacity-90"/>
        </div>
      </div>

      <div className="max-w-[80%] m-auto flex gap-16 flex-wrap justify-center">
        {posts.map((post)=>(
          <PostCard post={post} key={post.sys.id}/>
        ))}
      </div>
    </div>
  )
}

Home.getLayout = function getLayout(page) {
  return <Layout title="News">{page}</Layout>
}

export async function getServerSideProps() {
  const posts = await getPosts();

  return {
    props: {posts}
  }
}