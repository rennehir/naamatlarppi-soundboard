import { Flex, Heading, SimpleGrid, Skeleton } from '@chakra-ui/react'
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useLiveQuery } from 'next-sanity/preview'

import AudioPlayer from '~/components/AudioPlayer'
import TwoRowsScroller from '~/components/TwoRowsScroller'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import {
  getSoundboard,
  type Soundboard,
  soundboardQuery,
} from '~/lib/sanity.queries'
import type { SharedPageProps } from '~/pages/_app'

export const getServerSideProps: GetServerSideProps<
  SharedPageProps & {
    soundboard: Soundboard
  }
> = async ({ draftMode = false }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const soundboard = await getSoundboard(client)

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      soundboard,
    },
  }
}

export default function IndexPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const [soundboard] = useLiveQuery<Soundboard>(
    props.soundboard,
    soundboardQuery
  )
  return (
    <Skeleton isLoaded={!!soundboard}>
      <Flex as="section" height="50vh" direction="column">
        <Heading>Songs</Heading>
        <TwoRowsScroller flexGrow={1}>
          {soundboard.songs.map((song) => (
            <AudioPlayer
              key={song._key}
              title={song.title}
              audio={song.file}
              color={song.color}
              canPause
            />
          ))}
        </TwoRowsScroller>
      </Flex>
      <Flex as="section" height="50vh" direction="column">
        <Heading>Effects</Heading>
        <TwoRowsScroller flexGrow={1}>
          {soundboard.effects.map((effect) => (
            <AudioPlayer
              key={effect._key}
              title={effect.title}
              audio={effect.effect}
              color={effect.color}
            />
          ))}
        </TwoRowsScroller>
      </Flex>
    </Skeleton>
  )
}
