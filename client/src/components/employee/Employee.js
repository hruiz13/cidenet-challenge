import { Button, Table, Form, Modal, Input, Tooltip, Popconfirm, Select, Space } from 'antd';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaTrashAlt, FaPencilAlt } from 'react-icons/fa';
import { SearchOutlined } from '@ant-design/icons';
import { loadUsers } from '../../actions/formActions'

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
            const data = { ...values, lastUUID: editId.uuid, lastEmail: editId.email, id: editId.id }
            console.log(data)
            //dispatch(updateUser(data))
            setIsModalVisible(false)
            setEditId(null)
        }
    }

    const handleDelete = (id) => {
        const index = users.find((type) => type.id === id)
        //dispatch(deletUser(index.id))
    }

    const handleEdit = (id) => {
        setIsModalVisible(true)
        const index = users.find((user) => user.id === id)
        setEditId(index)
        setFields([
            { name: ['dni'], value: index.uuid },
            { name: ['primer_nombre'], value: index.email },
            { name: ['otros_nombres'], value: index.first_name },
            { name: ['primer_apellido'], value: index.last_name },
            { name: ['segundo apellido'], value: index.birth_date },
            { name: ['phone'], value: index.phone },
            { name: ['country'], value: index.country },
            { name: ['address'], value: index.address },
            { name: ['role'], value: index.role },
        ])

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
