import React from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import './HomeScreen.css'
import { NavLink } from 'react-router-dom';
import { FormScreen } from './register/FormScreen';

const { Header, Content, Footer } = Layout;

export const RegisterScreen = () => {
    return (
        <Layout className="layout">
            <Header>
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                    <Menu.Item key="1"><NavLink to="/" >Consulta de empleados</NavLink></Menu.Item>
                    <Menu.Item key="2"><NavLink to="/register" >Registro de empleados</NavLink></Menu.Item>
                </Menu>
            </Header>
            <Content style={{ padding: '0 50px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Inicio</Breadcrumb.Item>
                    <Breadcrumb.Item>Consulta de empleados</Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-content">
                    Registar un nuevo empleado.
                <FormScreen />
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>©2021 Created by hruiz</Footer>
        </Layout>
    )
}
