import Carousel from 'react-bootstrap/Carousel';

function Carrusel() {
  return (
    <Carousel fade>
      <Carousel.Item>
        <img 
        className= "d-block w-100" 
        src = "https://plus.unsplash.com/premium_photo-1778790192427-329d55634a40?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt = "image 1"
        style={{ height: '300px', objectFit: 'cover' }}
        />
        <Carousel.Caption className="bg-success bg-opacity-80 text-succes px-4">
        <h4 className='text-start '>El mundo es incierto.</h4>
        <p className='text-end'>Nosotros, somos tu seguridad.</p>
      </Carousel.Caption>
        
      </Carousel.Item>
      <Carousel.Item>
      <img 
        className= "d-block w-100" 
        src = "https://plus.unsplash.com/premium_photo-1779747618131-d8e625249214?q=80&w=835&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt = "image 2"
        style={{ height: '300px', objectFit: 'cover' }}
        />
      <Carousel.Caption className="rounded p-1 "
        style={{backgroundColor: '#a7a5a5' }}>
        <h3 className='text-success fst-italic'>Tus datos en tus manos</h3>
      </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img 
        className= "d-block w-100" 
        src = "https://cdn.cosmos.so/6e483bce-c14b-4ee7-8828-22eb4ebccba7?format=webp"
        alt = "iamge 3"
        style={{ height: '300px', objectFit: 'cover' }}
        />
      <Carousel.Caption className='rounded p-1'
        style={{backgroundColor: '#c0b62d' }}>
        <h3 >Tu dinero donde debe estar.</h3>
      </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Carrusel;