import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { type NewsState } from 'src/features'
import { getNews } from 'src/selectors'
import { fetchNews } from 'src/features/news'
import { type AppDispatch } from 'src/store'
import { Col, Container, Row } from 'react-bootstrap'
import { NewsPanel } from 'src/components/NewsPanel'
import styles from './News.module.scss'
import ContentBoard from 'src/components/ContentBoard/ContentBoard'
import { Map } from 'src/components/Map/Map'

const News = (): JSX.Element => {
  const news: NewsState = useSelector(getNews)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    setTimeout(() => {
      void dispatch(fetchNews())
    }, 2000)
  }, [])

  return (
    <>
      <ContentBoard className={styles.dataBoard}>
        <Container>
          <div className='text-center'>
            <h3>Recent Local News</h3>
            <p>Powered by: <a href="https://newsroom.calgary.ca/" title="https://newsroom.calgary.ca/"> The Calgary Newsroom</a></p>
          </div>
          <hr />
          <Row>
            <Col lg={6} md={6} sm={12}>
              <NewsPanel newsItem={news.newsItems[0] ?? undefined} />
            </Col>
            <Col lg={6} md={6} sm={12}>
              {[1, 2, 3].map((num, idx) => (
                <Col key={idx}>
                  <NewsPanel newsItem={news.newsItems[num]} />
                </Col>
              ))}
            </Col>
          </Row>
          <Row className="justify-content-center">
            {[4, 5, 6].map((num, idx) => (
              <Col key={idx} lg={4} md={4} sm={12}>
                <NewsPanel newsItem={news.newsItems[num]} />
              </Col>))}
          </Row>
          <Row className="justify-content-center">
            {[7, 8, 9, 10].map((num, idx) => (
              <Col key={idx} lg={3} md={4} sm={12}>
                <NewsPanel newsItem={news.newsItems[num]} />
              </Col>))}
          </Row>

        </Container>
      </ContentBoard>
      <ContentBoard negateStyle className={styles.dataBoard}>
        <Container>
          <Row>
            <Col>
              <Map />
            </Col>
            <Col>
              <Map />
            </Col>
          </Row>
        </Container>
      </ContentBoard>
    </>
  )

  //   switch (news.status) {
  //     case ApiLoadStatus.SUCCESS:
  //       return <>{news.newsItems.map((item, index) => (<p key={index}>{item.title + ' ' + item.linkUrl.toString()}</p>))}</>
  //     default:
  //       return <img src={loading} alt='loading' />
  //   }
}

export default News
