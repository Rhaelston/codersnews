import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import Head from "next/head";
import { getPost, postType } from "../../services/content";
import { Layout } from "../../components/Layout";

const renderOptions = {
    renderNode: {
        [BLOCKS.EMBEDDED_ASSET]: (node, children) =>(
            <img 
                src={node.data.target.fields.file.url}
                height={node.data.target.fields.file.details.height}
                width={node.data.target.fields.file.details.width}
                alt="content image"
            />
        )
    }
}

type Props = {
    post: postType
}


export default function Post ({post}: Props) {
    return (
        <Layout title={post.fields.title}>
        <div>
            <Head>
                <title>{post.fields.title} | Coders Blog</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="w-4/5 m-auto min-h-[21.5rem] padding-14 mt-4">
                <div className="w-full max-w-4xl m-auto">
                    <img alt="Post thumbnail" src={post.fields.thumbnail.fields.file.url}
                     className="w-full object-cover rounded-[1.875rem]"
                    />
                </div>

                <div className="mt-5 whitespace-pre-wrap">
                    {documentToReactComponents(post.fields.content, renderOptions)}
                </div>
            </div>
        </div>
        </Layout>
    )
}


export async function getServerSideProps({query}) {
    const post = await getPost(query.id);
  
    return {
      props: {post}
    }
  }