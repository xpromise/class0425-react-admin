import React, { Component } from 'react';
import { Card, Button, Table, Modal, message } from 'antd';
import dayjs from "dayjs";

import { reqGetUser, reqAddUser, reqUpdateUser, reqGetRole, reqDeleteUser } from '@api';

import AddUserForm from './add-user-form';
import UpdateUserForm from './update-user-form';

export default class User extends Component {
  state = {
    users: [], //用户数组
    roles: [],
    isShowAddUserModal: false,
    isShowUpdateUserModal: false,
    username: '',
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
      dataIndex: 'createTime',
      render: time => dayjs(time).format('YYYY-MM-DD HH:mm:ss')
    },
    {
      title: '所属角色',
      dataIndex: 'roleId',
      render: (id) => {
        const role = this.state.roles.find((role) => role._id === id);
        return role ? role.name : '';
      }
    },
    {
      title: '操作',
      dataIndex: 'username',
      render: username => {
        return <div>
          <Button type="link" onClick={this.showUpdateModal(username)}>修改密码</Button>
          <Button type="link" onClick={this.showDeleteUserModal(username)}>删除</Button>
        </div>
      }
    }
  ];

  showDeleteUserModal = (username) => {
    return () => {
      Modal.confirm({
        title: `确认要删除${username}这个账号吗`,
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          reqDeleteUser(username)
            .then(() => {
              message.success('删除用户成功~');
            })
            .catch((err) => {
              message.error(err);
            })
        }
      })
    }
  }

  showUpdateModal = (username) => {
    return () => {
      this.setState({
        username,
        isShowUpdateUserModal: true
      })
    }
  };

  componentDidMount() {
    reqGetUser()
      .then((res) => {
        message.success('获取用户列表成功', 3);
        this.setState({
          users: res
        })
      })
      .catch(() => {
        message.error('获取用户列表失败', 3);
      });

    reqGetRole()
      .then((res) => {
        message.success('获取角色列表成功', 3);
        this.setState({
          roles: res
        })
      })
      .catch(() => {
        message.error('获取角色列表失败', 3);
      })
  }

  //创建用户的回调函数
  addUser = () => {
    this.addUserFormRef.current.validateFields((err, values) => {
      if (!err) {
        const { username, password, phone, email, roleId } = values;
        // 发送请求
        reqAddUser({username, password, phone, email, roleId})
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
    const form = this.updateUserFormRef.current;

    form.validateFields((err, values) => {
      if (!err) {
        const { password, rePassword } = values;

        if (password !== rePassword) {
          return form.setFields({
            rePassword: {
              value: rePassword,
              errors: [new Error('两次密码输入不一致，请重新输入')],
            },
          });
        }
        // 发送请求
        reqUpdateUser(this.state.username, password)
          .then((res) => {
            message.success('更新用户密码成功');
          })
          .catch(() => {
            message.error('更新用户密码失败');
          })
          .finally(() => {
            this.setState({
              isShowUpdateUserModal: false
            });
            form.resetFields();
          })
      }
    })

  };

  switchModal = (key, value) => {
    return () => {
      this.setState({
        [key]: value
      })
    }
  };

  render () {
    const { users, roles, isShowAddUserModal, isShowUpdateUserModal } = this.state;

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
          onCancel={this.switchModal(false)}
          okText='确认'
          cancelText='取消'
        >
          <AddUserForm ref={this.addUserFormRef} roles={roles}/>
        </Modal>

        <Modal
          title="修改密码"
          visible={isShowUpdateUserModal}
          onOk={this.updateUser}
          onCancel={this.switchModal('isShowUpdateUserModal', false)}
          okText='确认'
          cancelText='取消'
        >
          <UpdateUserForm ref={this.updateUserFormRef} />
        </Modal>

      </Card>
    )
  }
}