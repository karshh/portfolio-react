import { format } from 'date-fns'
import { Container } from 'react-bootstrap'

const footerStyle = {
  paddingTop: '20px',
  color: '#f3f3f3',
  bottom: '0',
  width: '100%',
  height: '60px',
  /* Height of the footer */
  backgroundColor: '#202020'
}

const Footer = (): JSX.Element => (
  <div className=" text-center" style={footerStyle}>
    <Container>
      <p>Copyright &copy; Karsh Sharma {format(Date.now(), 'yyyy')}</p>
    </Container>
  </div>
)

export default Footer
