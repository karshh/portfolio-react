import { useSelector } from 'react-redux'
import { NavBar } from 'src/components/NavBar'
import { ReactComponent as CalgarySVG } from './Calgary.svg'
import { Col, Row } from 'react-bootstrap'
import { FaMapMarkerAlt, FaRegClock } from 'react-icons/fa'
import { BsThermometerHalf } from 'react-icons/bs'
import styles from './Home.scss'
import { type AppState } from 'src/features/store'

const Home = (): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
  const time = useSelector((state: AppState) => state.time.time)

  const current = new Date()
  console.log(time)
  return (
    <>
      <NavBar />
      <div className="text-center">
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
         <span><FaRegClock /> {current.getHours()}:{current.getMinutes()} AM</span>
        </Col>
        <Col>
        <BsThermometerHalf /> 10 &deg;C
        </Col>
      </Row>
      <div className={styles.svg}>
        <CalgarySVG />
      </div>
      </div>
    </>
  )
}

export default Home
