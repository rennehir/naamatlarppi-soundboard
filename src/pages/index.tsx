import { Box, HStack } from '@chakra-ui/react'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { useLiveQuery } from 'next-sanity/preview'

import AudioPlayer from '~/components/AudioPlayer'
import Container from '~/components/Container'
import Welcome from '~/components/Welcome'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import {
  getSoundboard,
  type Soundboard,
  soundboardQuery,
} from '~/lib/sanity.queries'
import type { SharedPageProps } from '~/pages/_app'

export const getStaticProps: GetStaticProps<
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
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const [soundboard] = useLiveQuery<Soundboard>(
    props.soundboard,
    soundboardQuery
  )
  return (
    <Container>
      <section>
        {soundboard ? (
          <Box>
            <HStack>
              {soundboard.effects.map((effect) => (
                <AudioPlayer key={effect._key} effect={effect} />
              ))}
            </HStack>
            <pre>
              <code>{JSON.stringify(soundboard, null, 2)}</code>
            </pre>
          </Box>
        ) : (
          <Welcome />
        )}
      </section>
    </Container>
  )
}
