import { type NewsItem } from 'src/features'
import { format } from 'date-fns'
import styles from './NewsPanel.module.scss'

interface Props {
  newsItem?: NewsItem
}

console.log(styles)

const EmptyNewsPanel = (): JSX.Element => (
  <div className={styles.panelAnimate}>
  <a className={styles.panelLinks}>
    <h6 > &nbsp; </h6>
    <p> &nbsp; </p>
  </a>
</div>
)

const NewsPanel = ({ newsItem }: Props): JSX.Element => newsItem === undefined
  ? <EmptyNewsPanel />
  : (
    <div className={styles.panel}>
      <a className={styles.panelLinks} href={newsItem.linkUrl.toString()} target="_blank" rel="noreferrer">
        <h6>{ newsItem.title }. </h6>
        <small> { format(newsItem.pubdate, 'MMM dd, yyyy hh:mm a') } </small>
      </a>
    </div>
    )

export default NewsPanel
