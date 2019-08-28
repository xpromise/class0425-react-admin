import React, { Component } from 'react';
import { Card, Button, Table, Modal, message } from 'antd';
import dayjs from "dayjs";

import { connect } from 'react-redux';
import { getRoleAsync } from '../../redux/action-creators';

import { reqGetUser, reqAddUser, reqGetRole } from '../../api';

import AddUserForm from './add-user-form';
import UpdateUserForm from './update-user-form';

class User extends Component {
  state = {
    users: [], //用户数组
    isShowAddUserModal: false, //是否展示创建用户的标识
    isShowUpdateUserModal: false, //是否展示更新用户的标识
  };

  addUserFormRef = React.createRef();
  updateUserFormRef = React.createRef();

  columns = [
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
    },
    {
      title: '电话',
      dataIndex: 'phone',
    },
    {
      title: '注册时间',
      dataIndex: 'create_time',
      render: time => dayjs(time).format('YYYY-MM-DD HH:mm:ss')
    },
    {
      title: '所属角色',
      dataIndex: 'role_id',
      render: (id) => {
        const role = this.props.roles.find((role) => role._id === id);
        return role ? role.name : '';
      }
    },
    {
      title: '操作',
      render: user => {
        return <div>
          <Button type="link" onClick={() => {}}>修改</Button>
          <Button type="link" onClick={() => {}}>删除</Button>
        </div>
      }
    }
  ];

  componentDidMount() {
    reqGetUser()
      .then((res) => {
        message.success('获取用户列表成功', 3);
        this.setState({
          users: res.users
        })
      })
      .catch(() => {
        message.error('获取用户列表失败', 3);
      });

    if (!this.props.roles.length) {
      this.props.getRoleAsync();
    }
  }

  //创建用户的回调函数
  addUser = () => {
    this.addUserFormRef.current.validateFields((err, values) => {
      if (!err) {
        const { username, password, phone, email, role_id } = values;
        // 发送请求
        reqAddUser({username, password, phone, email, role_id})
          .then((res) => {
            message.success('添加用户成功', 3);
            this.setState({
              users: [...this.state.users, res],
            })
          })
          .catch(() => {
            message.error('添加用户失败', 3);
          })
          .finally(() => {
            this.setState({
              isShowAddUserModal: false
            });
            this.addUserFormRef.current.resetFields();
          })
      }
    })

  };
  
  updateUser = () => {
  };

  switchModal = (key, value) => {
    return () => {
      this.setState({
        [key]: value
      })
    }
  };
  
  render () {
    const { users, isShowAddUserModal, isShowUpdateUserModal } = this.state;
    const { roles } = this.props;
    
    return (
      <Card
        title={
          <Button type='primary' onClick={this.switchModal('isShowAddUserModal', true)}>创建用户</Button>
        }
      >
        <Table
          columns={this.columns}
          dataSource={users}
          bordered
          rowKey='_id'
          pagination={{
            defaultPageSize: 5,
            showSizeChanger: true,
            pageSizeOptions: ['5', '10', '15', '20'],
            showQuickJumper: true,
          }}
        />
  
        <Modal
          title="创建用户"
          visible={isShowAddUserModal}
          onOk={this.addUser}
          onCancel={this.switchModal('isShowAddUserModal', false)}
          okText='确认'
          cancelText='取消'
        >
          <AddUserForm ref={this.addUserFormRef} roles={roles}/>
        </Modal>
  
        <Modal
          title="更新用户"
          visible={isShowUpdateUserModal}
          onOk={this.updateUser}
          onCancel={this.switchModal('isShowUpdateUserModal', false)}
          okText='确认'
          cancelText='取消'
        >
          <UpdateUserForm ref={this.updateUserFormRef}/>
        </Modal>
        
      </Card>
    )
  }
}

export default connect(
  (state) => ({roles: state.roles}),
  { getRoleAsync }
)(
  User
)
