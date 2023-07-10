import { Flex, Text } from '@chakra-ui/react'
import * as React from 'react'

import { Effect } from '~/lib/sanity.queries'

interface AudioPlayerProps {
  effect: Effect
}

const AudioPlayer = (props: AudioPlayerProps) => {
  const { asset } = props.effect.effect

  const [audioEl, setAudioEl] = React.useState<HTMLAudioElement | undefined>()
  const [isPlaying, setIsPlaying] = React.useState(false)

  React.useEffect(() => {
    const audio = new Audio(asset.url)
    setAudioEl(audio)
    const handleStateChange = (ev: Event) => {
      if (ev.type === 'play') setIsPlaying(true)
      if (ev.type === 'pause') setIsPlaying(false)
    }
    audio.addEventListener('play', handleStateChange)
    audio.addEventListener('pause', handleStateChange)

    return () => {
      audio.removeEventListener('play', handleStateChange)
      audio.removeEventListener('pause', handleStateChange)
    }
  }, [asset.url])

  if (!props.effect) {
    return null
  }

  function playAudio() {
    audioEl.play()
  }

  const { rgb, hex } = props.effect.color ?? {}

  return (
    <Flex
      onClick={playAudio}
      aria-label="Play audio"
      borderWidth={2}
      borderStyle="solid"
      borderColor={isPlaying ? 'teal.400' : 'gray.300'}
      bg={hex ?? 'gray.100'}
      color={
        rgb
          ? rgb?.r * 0.299 + rgb?.g * 0.587 + rgb?.b * 0.114 > 186 // Magic numbers
            ? 'black'
            : 'white'
          : 'black'
      }
      borderRadius="sm"
      h="full"
      w="30vw"
      cursor="pointer"
      padding={2}
      justifyContent="center"
      alignItems="center"
      boxShadow="xl"
    >
      <Text textAlign="center">{props.effect.title}</Text>
    </Flex>
  )
}

export default AudioPlayer
