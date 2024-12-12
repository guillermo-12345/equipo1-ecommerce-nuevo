import { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

const CheckoutForm = ({ onConfirm }) => {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')

    const handleConfirm = (event) => {
        event.preventDefault()

        const userData = {
            name, phone, email
        }

        onConfirm(userData)
    }
    return (
        <div className='ContainerFormCheckout'>
            <Form onSubmit={handleConfirm} className=' justify-content-center'>
                <Row className=' justify-content-center'>
                    <Form.Group className="mb-3 col-4 ">
                        <Form.Label className=''>
                            Nombre
                        </Form.Label>
                            <Form.Control className=''
                                type='text' placeholder='Guille Ibañez'
                                value={name}
                                onChange={({ target }) => setName(target.value)}
                            />
                        <Form.Text className="text-muted">
                        Nombre Completo
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3 col-3">
                        <Form.Label className=''>
                            Telefono
                        </Form.Label>
                        <Form.Control className=''
                            type='text' placeholder='11 #### ####'
                            value={phone}
                            onChange={({ target }) => setPhone(target.value)}
                        />
                        <Form.Text className="text-muted">
                        Celular o personal
                        </Form.Text>
                    </Form.Group>
                </Row>
                <Row className='justify-content-center'>
                    <Form.Group className="mb-3 col-5 ">
                        <Form.Label className=''>
                            Email</Form.Label>
                            <Form.Control className=''
                                type="email" name="email" required placeholder='xx@xxx.xx'
                                value={email}
                                onChange={({ target }) => setEmail(target.value)}
                            />
                        <Form.Text className="text-muted">
                            Validar Email
                        </Form.Text>
                    </Form.Group>
                </Row>
                <Button type='submit' className=''>Crear Orden</Button>
                
            </Form>


        </div>

    )

}

export default CheckoutForm