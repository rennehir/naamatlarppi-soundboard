import { Button } from '@chakra-ui/react'
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
  return (
    <Button
      onClick={playAudio}
      aria-label="Play audio"
      border={isPlaying ? 'solid 1px green' : ''}
    >
      {props.effect.title}
    </Button>
  )
}

export default AudioPlayer
