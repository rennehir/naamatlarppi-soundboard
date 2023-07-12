import type { PortableTextBlock } from '@portabletext/types'
import type { ImageAsset, Slug } from '@sanity/types'
import groq from 'groq'
import { type SanityClient } from 'next-sanity'

export const postsQuery = groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc)`

export async function getPosts(client: SanityClient): Promise<Post[]> {
  return await client.fetch(postsQuery)
}

export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0]`

export async function getPost(
  client: SanityClient,
  slug: string
): Promise<Post> {
  return await client.fetch(postBySlugQuery, {
    slug,
  })
}

export const postSlugsQuery = groq`
*[_type == "post" && defined(slug.current)][].slug.current
`

export interface Post {
  _type: 'post'
  _id: string
  _createdAt: string
  title?: string
  slug: Slug
  excerpt?: string
  mainImage?: ImageAsset
  body: PortableTextBlock[]
}

const colorFields = `
  hex,
  rgb {
    _type,
    r,
    g,
    b,
    a
  }
`
export interface Color {
  hex: string
  rgb: {
    _type: string
    r: number
    g: number
    b: number
    a: number
  }
}

const audioFields = `
  _type,
  asset-> {
    url,
  }
`

export interface Audio {
  _type: string
  asset: {
    url: string
  }
}

export interface Effect {
  _key: string
  title: string
  effect: Audio
  color?: Color
}

export interface Song {
  _key: string
  title: string
  file: Audio
  color?: Color
}

export interface Soundboard {
  songs: Song[]
  effects: Effect[]
}

export const soundboardQuery = groq`
  *[_type == 'soundboard' && _id == 'soundboard'][0] {
    _type,
    _id,
    _createdAt,
    songs[] {
      _type,
      _key,
      title,
      file {
        ${audioFields}
      },
      color {
        ${colorFields}
      }
    },
    effects[] {
      _type,
      _key,
      title,
      effect {
        ${audioFields}
      },
      color {
        ${colorFields}
      }
    }
  }
`

export async function getSoundboard(client: SanityClient): Promise<Soundboard> {
  return await client.fetch(soundboardQuery)
}
