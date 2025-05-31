import { type ReactNode } from 'react'

type HeadingSize = 1 | 2 | 3 | 4 | 5 | 6

export interface HeadingProps {
  children: string | ReactNode
  size: HeadingSize
  fontSize?: HeadingSize
  className?: string
  icon?: string
}

export type HeadingSizeMap = {
  [key in HeadingSize]: string
}
