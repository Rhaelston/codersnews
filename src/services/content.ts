import { Document } from "@contentful/rich-text-types";
import Contentful, { createClient, Entry } from "contentful"


export type postType = Entry<{
    title: Contentful.EntryFields.Text;
    description: Contentful.EntryFields.Text;
    content: Document;
    thumbnail: Contentful.Asset;
}>

const client = createClient({
    space: 'upkucz9yeq2e',
    accessToken: '9GQ3u9rObAjvvQPQCefvT-B0S0N2uXdvmkjurFJG_lM',
});

export async function getPosts(): Promise<Contentful.Entry<postType>[]> {
    const {items} = await client.getEntries<postType>({
        content_type: 'post'
    })

    return items;
}

export async function getPost(postId: string): Promise<Contentful.Entry<postType>> {
    const post = await client.getEntry<postType>(postId)

    return post;
}