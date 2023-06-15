import { ReactComponent as CalgarySVG } from './Calgary.svg'
import { Col, Row } from 'react-bootstrap'
import { FaMapMarkerAlt, FaRegClock } from 'react-icons/fa'
import { BsThermometerHalf } from 'react-icons/bs'
import styles from './Home.scss'
import { Clock } from 'src/components/Clock'
import Weather from 'src/components/Weather/Weather'

const Home = (): JSX.Element => (
    <>
      <div className="text-center intro">
        <h3>&#123; name = Karsh &#125;</h3>
        <p> Welcome to my corner. </p>
        <p>
          Here, I document my journey dedicated to excelling as a full-stack
          developer.
        </p>
        <p>
          Check out my
          <a href="https://www.linkedin.com/in/karshsharma">linkedin</a> and
          <a href="https://github.com/karshh">github</a> profile.
        </p>

      <Row>
        <Col>
        <span><FaMapMarkerAlt /> Calgary, AB</span>
        </Col>
        <Col>
          <FaRegClock />
          <Clock />
        </Col>
        <Col>
          <BsThermometerHalf />
          <Weather />
        </Col>
      </Row>
      <div className={styles.svg}>
        <CalgarySVG />
      </div>
      </div>
    </>
)

export default Home
