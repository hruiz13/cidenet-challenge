import { Button, Table, Form, Modal, Input, Tooltip, Popconfirm, Select, Space, Radio, Switch } from 'antd';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaTrashAlt, FaPencilAlt } from 'react-icons/fa';
import { SearchOutlined } from '@ant-design/icons';
import { deletUser, editUser, loadUsers } from '../../actions/formActions'
import { car } from '../helpers/validations';
import { checkDni } from '../../actions/formActions';
import moment from 'moment';



const campos = [
    { name: ['dni'], value: '' },
    { name: ['primer_nombre'], value: '' },
    { name: ['otros_nombres'], value: '' },
    { name: ['primer_apellido'], value: '' },
    { name: ['segundo_apellido'], value: '' },
    { name: ['birth_date'], value: '' },
    { name: ['address'], value: '' },
    { name: ['role'], value: '' },
]

const { Option } = Select;

export const Employee = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editId, setEditId] = useState(null)
    const [fields, setFields] = useState(campos);
    const [form] = Form.useForm();

    const { users } = useSelector((state) => state?.users)

    const dispatch = useDispatch()

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
    };

    const handleReset = (clearFilters) => {
        clearFilters();
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
        }) => (
            <div style={{ padding: 8 }}>
                <Input
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: "block" }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 30 }}
                    ></Button>
                    <Button
                        onClick={() => handleReset(clearFilters)}
                        size="small"
                        style={{ width: 60, marginLeft: "52px" }}
                    >
                        Reset
              </Button>
                    <Button
                        type="link"
                        size="small"
                        style={{ marginLeft: "120px" }}
                        onClick={() => {
                            confirm({ closeDropdown: false });
                        }}
                    >
                        Filter
              </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex]
                    .toString()
                    .toLowerCase()
                    .includes(value.toLowerCase())
                : "",
        render: (text) => text,
    });

    const columns = [
        {
            title: 'DNI',
            dataIndex: 'dni',
            key: 'dni',
            ...getColumnSearchProps("dni"),
        }, {
            title: 'Primer Nombre',
            dataIndex: 'primer_nombre',
            key: 'primer_nombre',
            ...getColumnSearchProps("primer_nombre"),
        }, {
            title: 'Segundo Nombre',
            dataIndex: 'otros_nombres',
            key: 'otros_nombres',
            ...getColumnSearchProps("otros_nombres"),
        }, {
            title: 'Primer Apellido',
            dataIndex: 'primer_apellido',
            key: 'primer_apellido',
            ...getColumnSearchProps("primer_apellido"),
        }, {
            title: 'Segundo Apellido',
            dataIndex: 'segundo_apellido',
            key: 'segundo_apellido',
            ...getColumnSearchProps("segundo_apellido"),
        }, {
            title: 'Tipo de identificacion',
            dataIndex: 'tipo_dni',
            key: 'tipo_dni',
            ...getColumnSearchProps("tipo_dni"),
        }, {
            title: 'Numero de identificacion',
            dataIndex: 'dni',
            key: 'dni',
            ...getColumnSearchProps("dni"),
        }, {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            ...getColumnSearchProps("email"),
        }, {
            title: 'Pais',
            dataIndex: 'pais',
            key: 'pais',
            ...getColumnSearchProps("pais"),
        }, {
            title: 'Estado',
            dataIndex: 'estado',
            key: 'estado',
        }, {
            title: 'Action',
            dataIndex: 'operation',
            key: 'name',
            render: (_, record) =>
                users.length >= 1 ? (
                    <>
                        <Tooltip title="Editar">
                            <span className='adminrooms_options' onClick={() => handleEdit(record.id)}><FaPencilAlt size="18" color="orange" /> </span>
                        </Tooltip>
                        <Tooltip title="Eliminar">
                            <span className='adminrooms_options'>
                                <Popconfirm placement="left" title="Seguro de eliminar?" onConfirm={() => handleDelete(record.id)}>
                                    <FaTrashAlt size="18" color="red" />
                                </Popconfirm>
                            </span>
                        </Tooltip>
                    </>
                ) : null,
        }
    ]

    useEffect(() => {
        dispatch(loadUsers())
    }, [dispatch])

    const closeModal = () => {
        setFields(campos)
        setEditId(null)
        form.resetFields();
        setIsModalVisible(false)
    }

    const onFinish = (values) => {
        if (editId) {
            const data = { ...values, id: editId.id }
            console.log(data)
            dispatch(editUser(data))
            setIsModalVisible(false)
            setEditId(null)
        }
    }

    const handleDelete = (id) => {
        const index = users.find((type) => type.id === id)
        dispatch(deletUser(index.id))
    }

    const handleEdit = (id) => {
        setIsModalVisible(true)
        const index = users.find((user) => user.id === id)
        setEditId(index)
        setFields([
            { name: ['dni'], value: index.dni },
            { name: ['primer_nombre'], value: index.primer_nombre },
            { name: ['otros_nombres'], value: index.otros_nombres },
            { name: ['primer_apellido'], value: index.primer_apellido },
            { name: ['segundo_apellido'], value: index.segundo_apellido },
            { name: ['pais'], value: index.pais },
            { name: ['tipo_dni'], value: index.tipo_dni },
            { name: ['area'], value: index.area },
            { name: ['fecha_ingreso'], value: moment(index.fecha_ingreso).format('DD/MM/YYYY') },
            { name: ['created_at'], value: moment(index.created_at).format('DD/MM/YYYY') },
        ])

    }

    //Validacion de DNI
    const handleDni = (e) => {
        const { value } = e.target;
        const reg = /[a-zA-Z0-9-]-?\d*(\d*)?$/;
        if ((!reg.test(value)) || value === '' || value === '-') {
            form.setFieldsValue({ dni: value.slice(0, -1) })
        }
    }





    return (
        <div>
            <div className="types_upbar">
            </div>
            <Table
                dataSource={users}
                columns={columns}
                pagination={{ position: ['bottomCenter'] }}
                rowKey="email"
            />
            <Modal title="Add Type" visible={isModalVisible} onCancel={closeModal} footer={null} >

                <Form onFinish={onFinish} fields={fields} form={form} autoComplete="off">

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
                                    form.setFieldsValue({ otros_nombres: car(value) })
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
                        name="segundo_apellido"
                        label="Segundo Apellido"
                        rules={[
                            {
                                required: true,
                                message: "Por favor escriba el nombre."
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    form.setFieldsValue({ segundo_apellido: car(value) })
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
                                message: "Por favor escriba el documento de identificacion."
                            }, ({ getFieldValue }) => ({
                                validator: async (_, value) => {
                                    if (value.length > 3) {
                                        const existe = await checkDni(value)
                                        if (existe && value !== editId.dni) {
                                            return Promise.reject(new Error('El dni ya se encuentra registrado.'));
                                        } else {
                                            return Promise.resolve();
                                        }
                                    }
                                },
                            })
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
                        <Input
                            disabled
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


                    <Form.Item name="created_at" label="Fecha y hora de registro:">
                        <Input disabled />
                    </Form.Item>


                    <div className="users_btn">
                        <Button onClick={closeModal}>
                            Cancel
                        </Button>
                        <Button type="primary" htmlType="submit">
                            Save
                        </Button>
                    </div>

                </Form>
            </Modal>
        </div >
    )
}
