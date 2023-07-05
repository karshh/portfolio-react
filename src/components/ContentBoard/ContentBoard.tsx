import { type PropsWithChildren } from 'react'
import styles from './ContentBoard.module.scss'
import { mergeClassNames } from 'src/utils'

type Props = PropsWithChildren & {
  className?: string
  negateStyle?: boolean
}

const ContentBoard = (
  {
    children,
    className,
    negateStyle = false
  }: Props): JSX.Element => (
  <div
    className={mergeClassNames(className ?? '', negateStyle ? styles.negated : styles.normal)}
  >
    {children}
  </div>

)

export default ContentBoard
