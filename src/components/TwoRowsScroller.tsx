import { SimpleGrid, SimpleGridProps } from '@chakra-ui/react'

const TwoRowsScroller = (props: SimpleGridProps) => {
  return (
    <SimpleGrid
      templateRows="auto auto"
      gridAutoFlow="column"
      overflowX="scroll"
      spacing={4}
      padding={4}
      {...props}
    />
  )
}

export default TwoRowsScroller
