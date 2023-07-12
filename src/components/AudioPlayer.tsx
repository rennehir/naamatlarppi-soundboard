import { Flex, Text } from '@chakra-ui/react'
import * as React from 'react'

import { Audio as AudioType, Color } from '~/lib/sanity.queries'

interface AudioPlayerProps {
  audio: AudioType
  color?: Color
  title: string
}

const AudioPlayer = (props: AudioPlayerProps) => {
  const { audio, color, title } = props

  const [audioEl, setAudioEl] = React.useState<HTMLAudioElement | undefined>()
  const [isPlaying, setIsPlaying] = React.useState(false)

  React.useEffect(() => {
    const audioElement = new Audio(audio.asset.url)
    setAudioEl(audioElement)
    const handleStateChange = (ev: Event) => {
      if (ev.type === 'play') setIsPlaying(true)
      if (ev.type === 'pause') setIsPlaying(false)
    }
    audioElement.addEventListener('play', handleStateChange)
    audioElement.addEventListener('pause', handleStateChange)

    return () => {
      audioElement.removeEventListener('play', handleStateChange)
      audioElement.removeEventListener('pause', handleStateChange)
    }
  }, [audio?.asset.url])

  if (!audioEl) {
    return null
  }

  function playOrPauseAudio() {
    if (audioEl.paused) {
      audioEl.play()
    } else {
      audioEl.pause()
      audioEl.currentTime = 0
    }
  }

  const { rgb, hex } = color ?? {}

  return (
    <Flex
      onClick={playOrPauseAudio}
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
      boxShadow="lg"
    >
      <Text textAlign="center">{title}</Text>
    </Flex>
  )
}

export default AudioPlayer
