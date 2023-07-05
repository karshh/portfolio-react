import { ReactComponent as CalgarySVG } from './Calgary.svg'
import { Col, Container, Row } from 'react-bootstrap'
import { FaMapMarkerAlt, FaRegClock } from 'react-icons/fa'
import { BsThermometerHalf } from 'react-icons/bs'
import { Clock } from 'src/components/Clock'
import styles from './Home.module.scss'
import Weather from 'src/components/Weather/Weather'
import ContentBoard from 'src/components/ContentBoard/ContentBoard'
import { mergeClassNames } from 'src/utils'

const TopContent = (): JSX.Element => (
  <ContentBoard className={mergeClassNames(styles.topContent, 'text-center')}>
    <Container>
      <h4>&#123; const name = &apos;Karsh&apos; &#125;</h4>
      <p> Welcome to my corner. </p>
      <p>
        This website is supposed to be a portfolio,
        but really I just use it to learn how to build things.
      </p>
      <p>
        After all, the best way to learn something is to experiment with it!
      </p>
      <br />
      <p>
        Check out my&nbsp;
        <a href="https://www.linkedin.com/in/karshsharma">linkedin</a> and&nbsp;
        <a href="https://github.com/karshh">github</a> profile.
      </p>
      <Row>
        <Col>
          <FaMapMarkerAlt /> Calgary, AB
        </Col>
        <Col>
          <FaRegClock />&nbsp;<Clock />
        </Col>
        <Col>
          <BsThermometerHalf />&nbsp;<Weather />
        </Col>
      </Row>
      <CalgarySVG className={styles.svg} />
    </Container>
  </ContentBoard>
)

const BottomContent = (): JSX.Element => (
  <ContentBoard negateStyle className={styles.bottomContent}>
    <Container>
      <Row className="justify-content-center">
        {
          ['React 18', 'Redux', 'Rust', 'Bootstrap']
            .map((value, index) => (
              <Col key={index}>{value}</Col>
            ))
        }
      </Row>
    </Container>
  </ContentBoard>
)

const Home = (): JSX.Element => (
  <>
    <TopContent />
    <BottomContent />
  </>
)

export default Home
