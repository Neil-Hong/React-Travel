import { Form, Input, Button, Checkbox } from 'antd';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styles from "./SignInForm.module.css"
import {signIn} from "../../redux/user/slice"
import { useSelector } from '../../redux/hooks';

export const SignInForm = () => {

    const loading = useSelector((state)=> state.user.loading)
    const jwt = useSelector((state)=> state.user.token)
    const error= useSelector((state)=> state.user.error)
    const dispatch = useDispatch()
    const history = useNavigate()

    useEffect(()=>{
        if(jwt !== null){
            history("/")
        }
    },[jwt])

    const onFinish = async (values: any) => {
        console.log('Success:', values);
        dispatch(signIn({
            email:values.username,
            password:values.password
        }))   
    };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className={styles["signIn-form"]}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};