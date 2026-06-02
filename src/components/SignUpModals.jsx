import { Button, Form, Input, Modal } from "antd";
import { useAuth } from "../context/AuthContext";
import { MailOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons";

export default function SignUpModals() {
    const{showSignUp, setShowSignUp} = useAuth()
    const[form] = Form.useForm()

    function closeModal(){
        setShowSignUp(false)
    }

  return (
    <>
    <Modal open={showSignUp} onCancel={closeModal} closable={true} footer={null}
       className="custom-modal"
      style={{padding: 0, maxWidth: "100vw", width: "100%", display:'flex', justifyContent:'center', justifyItems:'center' }}
      styles={{
        mask: { backdropFilter: "blur(8px)", background: "rgba(6,16,30,0.85)" },
       
      }}>
          <div className="w-10 h-1 rounded-full mx-auto mb-6 bg-white/20" />

        <h2>Sign in to AquaPure</h2>

              <Form form={form} layout="vertical" size="large">
                 <Form.Item
            label="Full Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Enter your name",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Ujala Singh"
              className="h-12 rounded-xl"
            />
          </Form.Item>
              <Form.Item
            label="Mobile Number"
            name="phone"
            rules={[
              {
                required: true,
                message: "Enter mobile number",
              },
            ]}
          >
            <Input
              prefix={<PhoneOutlined />}
              placeholder="9876543210"
              maxLength={10}
              className="h-12 rounded-xl"
            />
          </Form.Item>
           <Form.Item
            label="Email Address"
            name="email"
            rules={[
              {
                type: "email",
                message: "Enter valid email",
              },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="ujala@gmail.com"
              className="h-12 rounded-xl"
            />
          </Form.Item>
            <Button
            htmlType="submit"
            block
            size="large"
            className="
              !h-12
              !rounded-xl
              !border-0
              !font-semibold
              !bg-gradient-to-r
              !from-cyan-500
              !to-blue-600
            "
          >
            Create Account
          </Button>
                </Form>

  <p className="text-center text-xs text-slate-500 mt-4">
          By continuing you agree to Terms & Conditions
        </p>
    </Modal>
    
    </>
  )
}


