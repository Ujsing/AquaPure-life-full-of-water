import { useState } from "react";
import {FacebookOutlined, GoogleOutlined, MailOutlined } from '@ant-design/icons'
import { Button, Card, Divider, Flex, Form, Input, message } from 'antd'
import { Typography } from 'antd';
const { Title, Text } = Typography;
export default function SignInModal() {
        const [loading, setLoading] = useState(false);
  const [loginType, setLoginType] = useState('mobile');

  const onFinish = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      message.success('Verification successful!');
      setLoading(false);
    }, 1500);
  };
  return (
    <>
    <div className='overflow-x-hidden flex justify-center items-center  w-full min-h-screen'>

  <div className=" bg-transparent flex items-center justify-center p-4">
      <Card className="w-full !bg-white/10 max-w-md !border-2 !border-white/20  rounded-3xl !border-0 overflow-hidden shadow-[0_0_25px_rgba(16,185,129,0.12)]">
        
        {/* Header */}
        <div className="text-center mb-8 mt-4">
          <div className="flex justify-center mb-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-md">
              <span className="text-white text-2xl font-bold">A</span>
            </div>
          </div>
          <Title level={2} className="!mb-1 !text-gray-200 font-semibold">
            Welcome back
          </Title>
          <Text type="secondary" className="text-base">
            Sign in to continue to AquaPure
          </Text>
        </div>

        <Form
          layout="vertical"
          size="large"
          onFinish={onFinish}
          className="px-2"
        >
          <Form.Item className="!mb-4">
            <div className="flex gap-8 justify-center ">
              <label className="flex items-center gap-2 cursor-pointer font-bold">
                <input 
                  type="radio" 
                  name="loginType" 
                  value="mobile" 
                  checked={loginType === 'mobile'}
                  onChange={(e) => setLoginType(e.target.value)}
                  className="w-4 h-4 text-blue-500" 
                />
                <span className="text-gray-200">Mobile</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer font-bold">
                <input 
                  type="radio" 
                  name="loginType" 
                  value="email" 
                  checked={loginType === 'email'}
                  onChange={(e) => setLoginType(e.target.value)}
                  className="w-4 h-4 text-blue-500" 
                />
                <span className="text-gray-200 ">Email</span>
              </label>
            </div>
          </Form.Item>

          {loginType === 'mobile' ? (
            <Form.Item 
              label="Mobile Number" 
              name="mobile"
              rules={[{ required: true, message: 'Please enter mobile number' }]}
              className="!mb-4 font-bold"
            >
              <Input 
                // prefix={<MobileOutlined className="text-gray-400" />}
                placeholder="98765 43210"
                // addonBefore="+91"
                className="rounded-lg"
              />
            </Form.Item>
          ) : (
            <Form.Item 
              label="Email" 
              name="email"
              rules={[
                { required: true, message: 'Please enter email' },
                { type: 'email', message: 'Enter valid email' }
              ]}
              className="!mb-4 font-bold"
            >
              <Input 
                prefix={<MailOutlined className="text-gray-400" />}
                placeholder="your@email.com"
                className="rounded-lg"
              />
            </Form.Item>
          )}

          {/* OTP */}
          <Form.Item 
            label="OTP" 
            name="otp"
            rules={[{ required: true, message: 'Please enter OTP' }]}
            className="!mb-6 font-bold"
          >
            <Input.OTP length={6} className="w-full justify-between [&_.ant-input-outlined]:!bg-transparent [&_.ant-input-outlined]:!border-gray-300 [&_.ant-input-outlined]:hover:!border-blue-400 [&_.ant-input-outlined]:focus:!border-blue-500" />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button 
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full h-12 !font-bold !bg-transparent !border-2 !border-white/20 !shadow-md hover:!shadow-lg transition-all duration-300 text-base font-medium rounded-xl"
            >
              Verify & Sign In
            </Button>
          </Form.Item>
        </Form>

        {/* Divider */}
        <Divider className="!text-gray-400 !text-sm">or continue with</Divider>

        {/* Social Buttons */}
        <Flex gap="middle" className="mb-6 px-2">
          <Button 
            icon={<GoogleOutlined className="text-base" />}
            className="flex-1 h-11 !bg-transparent rounded-xl !border !border-white/30 hover:border-blue-200 hover:bg-blue-50 transition-all duration-200 font-medium"
          >
            Google
          </Button>
          <Button 
            icon={<FacebookOutlined className="text-base text-blue-600" />}
            className="flex-1 h-11 rounded-xl !bg-transparent !border-white/30 hover:border-blue-200 hover:bg-blue-50 transition-all duration-200 font-medium"
          >
            Facebook
          </Button>
        </Flex>

        {/* Footer */}
        <div className="text-center pb-4">
          <Text type="secondary" className="text-sm">
            Don't have an account?{' '}
            <a href="#" className="text-blue-500 hover:text-blue-600 font-medium">
              Sign up
            </a>
          </Text>
        </div>
      </Card>
    </div>
    </div>
    </>
  )
}
