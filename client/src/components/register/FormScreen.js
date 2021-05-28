import { Form, Input, Button, Select, Radio, DatePicker, Switch } from 'antd';
import moment from 'moment';
import { car, car2 } from '../helpers/validations';
const { Option } = Select;
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

//desactivar fechas en el date picker
function disabledDate(current) {
    return current && (current < moment().subtract(1, 'month') || current > moment().endOf('day'));
}


export const FormScreen = () => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log(values);
    };

    const onReset = () => {
        form.resetFields();
    };

    //Validacion de DNI
    const handleDni = (e) => {
        const { value } = e.target;
        const reg = /[a-zA-Z0-9-]-?\d*(\d*)?$/;
        if ((!reg.test(value)) || value === '' || value === '-') {
            form.setFieldsValue({ dni: value.slice(0, -1) })
        }
    }


    return (
        <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
            <Form.Item
                name="primer_nombre"
                label="Primer Nombre"
                rules={[
                    {
                        required: true,
                        message: "Por favor escriba el nombre."
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            form.setFieldsValue({ primer_nombre: car(value) })
                            if (value?.length > 20) {
                                return Promise.reject(new Error('No puede tener mas de 20 caracteres.'));
                            }
                            return Promise.resolve();
                        },
                    })
                ]}
            >
                <Input maxLength='20' />
            </Form.Item>
            <Form.Item
                name="otros_nombres"
                label="Segundo Nombre"
                rules={[
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            form.setFieldsValue({ otros_nombres: car2(value) })
                            if (value?.length > 50) {
                                return Promise.reject(new Error('No puede tener mas de 20 caracteres.'));
                            }
                            return Promise.resolve();
                        },
                    })
                ]}
            >
                <Input maxLength='50' />
            </Form.Item>
            <Form.Item
                name="primer_apellido"
                label="Primer Apellido"
                rules={[
                    {
                        required: true,
                        message: "Por favor escriba el nombre."
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            form.setFieldsValue({ primer_apellido: car(value) })
                            if (value?.length > 20) {
                                return Promise.reject(new Error('No puede tener mas de 20 caracteres.'));
                            }
                            return Promise.resolve();
                        },
                    })
                ]}
            >
                <Input maxLength='20' />
            </Form.Item>
            <Form.Item
                name="segunddo_apellido"
                label="Segundo Apellido"
                rules={[
                    {
                        required: true,
                        message: "Por favor escriba el nombre."
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            form.setFieldsValue({ segunddo_apellido: car(value) })
                            if (value?.length > 20) {
                                return Promise.reject(new Error('No puede tener mas de 20 caracteres.'));
                            }
                            return Promise.resolve();
                        },
                    })
                ]}
            >
                <Input maxLength='20' />
            </Form.Item>
            <Form.Item
                name="pais"
                label="Pais del empleo"
                rules={[
                    {
                        required: true,
                        message: "Por favor seleccione un pais."
                    }]}
            >
                <Radio.Group>
                    <Radio value="Colombia">Colombia</Radio>
                    <Radio value="Estados Unidos">Estados Unidos</Radio>
                </Radio.Group>
            </Form.Item>
            <Form.Item
                name="tipo_dni"
                label="Tipo de identificacion"
                hasFeedback
                rules={[{ required: true, message: 'Por favor seleccione un tipo de identificacion!' }]}
            >
                <Select placeholder="Please select a country">
                    <Option value="Cedula de Ciudadania">Cédula de Ciudadanía</Option>
                    <Option value="Cedula de Extranjeria">Cédula de Extranjería</Option>
                    <Option value="Pasaporte">Pasaporte</Option>
                    <Option value="Permiso Especial">Permiso Especial</Option>
                </Select>
            </Form.Item>
            <Form.Item
                name="dni"
                label="Documento de identificacion"
                rules={[
                    {
                        required: true,
                        message: "Por favor escriba el nombre."
                    },
                ]}
                onChange={handleDni}
            >
                <Input maxLength='20' />
            </Form.Item>

            <Form.Item
                name="fecha_ingreso"
                label="Fecha de ingreso"
                rules={[{ required: true, message: 'Por favor seleccione una fecha de ingreso!' }]}
            >
                <DatePicker
                    disabledDate={disabledDate}
                />
            </Form.Item>

            <Form.Item
                name="area"
                label="Área"
                hasFeedback
                rules={[{ required: true, message: 'Por favor seleccione un area!' }]}
            >
                <Select placeholder="Please select a country">
                    <Option value="Administracion">Administración</Option>
                    <Option value="Financiera">Financiera</Option>
                    <Option value="Compras">Compras</Option>
                    <Option value="Infraestructura">Infraestructura</Option>
                    <Option value="Operacion">Operación</Option>
                    <Option value="Talento Humano">Talento Humano</Option>
                    <Option value="Servicios Varios">Servicios Varios</Option>
                </Select>
            </Form.Item>

            <Form.Item name="estado" label="Estado">
                <Switch disabled checked />
            </Form.Item>





            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    Enviar
                </Button>
                <Button htmlType="button" onClick={onReset}>
                    Limpiar
                </Button>
            </Form.Item>
        </Form>
    );
};