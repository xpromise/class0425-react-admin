import React, { Component } from 'react';
import { Card, Button, Table, Radio, Modal, message } from 'antd';
import dayjs from 'dayjs';

import { connect } from 'react-redux';
import { getRoleAsync, addRoleAsync, updateRoleAsync } from '../../redux/action-creators';

import AddRoleForm from './add-role-form';
import UpdateRoleForm from './update-role-form';

const RadioGroup = Radio.Group;

class Role extends Component {
  state = {
    value: '',  //单选的默认值，也就是选中的某个角色的id值
    isShowAddRoleModal: false, //是否展示创建角色的标识
    isShowUpdateRoleModal: false, //是否展示设置角色的标识
    isDisabled: true
  };

  addRoleFormRef = React.createRef();
  updateRoleFormRef = React.createRef();

  componentDidMount() {
    if (!this.props.roles.length) {
      this.props.getRoleAsync();
    }
  }

  columns = [
    {
      dataIndex: '_id',
      render: (_id) => <Radio  value={_id} />
    },
    {
      title: '角色名称',
      dataIndex: 'name',
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      render: (time) => dayjs(time).format('YYYY-MM-DD HH:mm:ss')
    },
    {
      title: '授权时间',
      dataIndex: 'auth_time',
      render: (time) => time ? dayjs(time).format('YYYY-MM-DD HH:mm:ss') : ''
    },
    {
      title: '授权人',
      dataIndex: 'auth_name',
    }
  ];

  onRadioChange = (e) => {
    // console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
      isDisabled: false
    });
  };
  
  switchModal = (key, value) => {
    return () => {
      this.setState({[key]: value})
    }
  };
  
  //创建角色的回调函数
  addRole = () => {
    // 表单校验
    this.addRoleFormRef.current.validateFields((err, values) => {
      if (!err) {
        const { name } = values;
        // 发送请求
        this.props.addRoleAsync(name);

        this.setState({
          isShowAddRoleModal: false
        });
        this.addRoleFormRef.current.resetFields();
      }
    })
  };
  //设置角色权限的回调函数
  updateRole = () => {
    this.updateRoleFormRef.current.validateFields((err, values) => {
      if (!err) {
        const { menus } = values;
        const name = this.props.name;
        const _id = this.state.value;
        this.props.updateRoleAsync(_id, name, menus);
        this.setState({
          isShowUpdateRoleModal: false
        });
        this.updateRoleFormRef.current.resetFields();
      }
    })
  };
  
  render () {
    const { value, isDisabled, isShowAddRoleModal, isShowUpdateRoleModal } = this.state;
    const { roles } = this.props;

    const role = roles.find((role) => role._id === value);
    const name = role ? role.name : '';
    
    return (
      <Card
        title={
          <div>
            <Button type='primary' onClick={this.switchModal('isShowAddRoleModal', true)}>创建角色</Button> &nbsp;&nbsp;
            <Button type='primary' disabled={isDisabled} onClick={this.switchModal('isShowUpdateRoleModal', true)}>设置角色权限</Button>
          </div>
        }
      >
        <RadioGroup onChange={this.onRadioChange} value={value} style={{width: '100%'}}>
          <Table
            columns={this.columns}
            dataSource={roles}
            bordered
            rowKey='_id'
            pagination={{
              defaultPageSize: 5,
              showSizeChanger: true,
              pageSizeOptions: ['5', '10', '15', '20'],
              showQuickJumper: true,
            }}
          />
        </RadioGroup>
  
        <Modal
          title="创建角色"
          visible={isShowAddRoleModal}
          onOk={this.addRole}
          onCancel={this.switchModal('isShowAddRoleModal', false)}
          okText='确认'
          cancelText='取消'
        >
          <AddRoleForm ref={this.addRoleFormRef}/>
        </Modal>
  
        <Modal
          title="设置角色权限"
          visible={isShowUpdateRoleModal}
          onOk={this.updateRole}
          onCancel={this.switchModal('isShowUpdateRoleModal', false)}
          okText='确认'
          cancelText='取消'
        >
          <UpdateRoleForm ref={this.updateRoleFormRef} name={name}/>
        </Modal>
        
      </Card>
    )
  }
}

export default connect(
  (state) => ({roles: state.roles, name: state.user.username}),
  {
    getRoleAsync,
    addRoleAsync,
    updateRoleAsync
  }
)(
  Role
)
