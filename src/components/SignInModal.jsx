// import { useState } from "react";
// import {FacebookOutlined, GoogleOutlined, MailOutlined } from '@ant-design/icons'
// import { Button, Card, Divider, Flex, Form, Input, message } from 'antd'
// import { Typography } from 'antd';
// const { Title, Text } = Typography;
// export default function SignInModal() {
//         const [loading, setLoading] = useState(false);
//   const [loginType, setLoginType] = useState('mobile');

//   const onFinish = async () => {
//     setLoading(true);
//     // Simulate API call
//     setTimeout(() => {
//       message.success('Verification successful!');
//       setLoading(false);
//     }, 1500);
//   };
//   return (
//     <>
//     <div className='overflow-x-hidden flex justify-center items-center  w-full min-h-screen'>

//   <div className=" bg-transparent flex items-center justify-center p-4">
//       <Card className="w-full !bg-white/10 max-w-md !border-2 !border-white/20  rounded-3xl !border-0 overflow-hidden shadow-[0_0_25px_rgba(16,185,129,0.12)]">
        
//         {/* Header */}
//         <div className="text-center mb-8 mt-4">
//           <div className="flex justify-center mb-3">
//             <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-md">
//               <span className="text-white text-2xl font-bold">A</span>
//             </div>
//           </div>
//           <Title level={2} className="!mb-1 !text-gray-200 font-semibold">
//             Welcome back
//           </Title>
//           <Text type="secondary" className="text-base">
//             Sign in to continue to AquaPure
//           </Text>
//         </div>

//         <Form
//           layout="vertical"
//           size="large"
//           onFinish={onFinish}
//           className="px-2"
//         >
//           <Form.Item className="!mb-4">
//             <div className="flex gap-8 justify-center ">
//               <label className="flex items-center gap-2 cursor-pointer font-bold">
//                 <input 
//                   type="radio" 
//                   name="loginType" 
//                   value="mobile" 
//                   checked={loginType === 'mobile'}
//                   onChange={(e) => setLoginType(e.target.value)}
//                   className="w-4 h-4 text-blue-500" 
//                 />
//                 <span className="text-gray-200">Mobile</span>
//               </label>
//               <label className="flex items-center gap-2 cursor-pointer font-bold">
//                 <input 
//                   type="radio" 
//                   name="loginType" 
//                   value="email" 
//                   checked={loginType === 'email'}
//                   onChange={(e) => setLoginType(e.target.value)}
//                   className="w-4 h-4 text-blue-500" 
//                 />
//                 <span className="text-gray-200 ">Email</span>
//               </label>
//             </div>
//           </Form.Item>

//           {loginType === 'mobile' ? (
//             <Form.Item 
//               label="Mobile Number" 
//               name="mobile"
//               rules={[{ required: true, message: 'Please enter mobile number' }]}
//               className="!mb-4 font-bold"
//             >
//               <Input 
//                 // prefix={<MobileOutlined className="text-gray-400" />}
//                 placeholder="98765 43210"
//                 // addonBefore="+91"
//                 className="rounded-lg"
//               />
//             </Form.Item>
//           ) : (
//             <Form.Item 
//               label="Email" 
//               name="email"
//               rules={[
//                 { required: true, message: 'Please enter email' },
//                 { type: 'email', message: 'Enter valid email' }
//               ]}
//               className="!mb-4 font-bold"
//             >
//               <Input 
//                 prefix={<MailOutlined className="text-gray-400" />}
//                 placeholder="your@email.com"
//                 className="rounded-lg"
//               />
//             </Form.Item>
//           )}

//           {/* OTP */}
//           <Form.Item 
//             label="OTP" 
//             name="otp"
//             rules={[{ required: true, message: 'Please enter OTP' }]}
//             className="!mb-6 font-bold"
//           >
//             <Input.OTP length={6} className="w-full justify-between [&_.ant-input-outlined]:!bg-transparent [&_.ant-input-outlined]:!border-gray-300 [&_.ant-input-outlined]:hover:!border-blue-400 [&_.ant-input-outlined]:focus:!border-blue-500" />
//           </Form.Item>

//           {/* Submit Button */}
//           <Form.Item>
//             <Button 
//               type="primary"
//               htmlType="submit"
//               loading={loading}
//               className="w-full h-12 !font-bold !bg-transparent !border-2 !border-white/20 !shadow-md hover:!shadow-lg transition-all duration-300 text-base font-medium rounded-xl"
//             >
//               Verify & Sign In
//             </Button>
//           </Form.Item>
//         </Form>

//         {/* Divider */}
//         <Divider className="!text-gray-400 !text-sm">or continue with</Divider>

//         {/* Social Buttons */}
//         <Flex gap="middle" className="mb-6 px-2">
//           <Button 
//             icon={<GoogleOutlined className="text-base" />}
//             className="flex-1 h-11 !bg-transparent rounded-xl !border !border-white/30 hover:border-blue-200 hover:bg-blue-50 transition-all duration-200 font-medium"
//           >
//             Google
//           </Button>
//           <Button 
//             icon={<FacebookOutlined className="text-base text-blue-600" />}
//             className="flex-1 h-11 rounded-xl !bg-transparent !border-white/30 hover:border-blue-200 hover:bg-blue-50 transition-all duration-200 font-medium"
//           >
//             Facebook
//           </Button>
//         </Flex>

//         {/* Footer */}
//         <div className="text-center pb-4">
//           <Text type="secondary" className="text-sm">
//             Don't have an account?{' '}
//             <a href="#" className="text-blue-500 hover:text-blue-600 font-medium">
//               Sign up
//             </a>
//           </Text>
//         </div>
//       </Card>
//     </div>
//     </div>
//     </>
//   )
// }


import { useState } from "react"
import { Modal, Input, Button, Form, message, Divider } from "antd"
import { MailOutlined, GoogleOutlined, FacebookOutlined } from "@ant-design/icons"
import { useAuth } from "../context/AuthContext"

export default function SignInModal() {
  const { showSignIn, setShowSignIn, login } = useAuth()
  const [step, setStep]       = useState("phone")   // "phone" | "otp"
  const [loginType, setLoginType] = useState("mobile") // "mobile" | "email"
  const [phone, setPhone]     = useState("")
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()

  function handleClose() {
    setShowSignIn(false)
    setStep("phone")
    setPhone("")
    form.resetFields()
  }

  function handleSendOtp() {
    const val = loginType === "mobile" ? phone : form.getFieldValue("email")
    if (loginType === "mobile" && phone.length < 10)
      return message.error("Enter a valid 10-digit number")
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setStep("otp")
      message.success("OTP sent!")
    }, 800)
  }

  function handleVerify() {
    setLoading(true)
    setTimeout(() => {
      login(phone || form.getFieldValue("email"))
      message.success("Welcome to AquaPure! 🎉")
      handleClose()
      setLoading(false)
    }, 800)
  }

  return (
    <Modal
      open={showSignIn}
      onCancel={handleClose}
      footer={null}
      closable={true}
      className="custom-modal"
      style={{padding: 0, maxWidth: "100vw", width: "100%", display:'flex', justifyContent:'center', justifyItems:'center' }}
      styles={{
        mask: { backdropFilter: "blur(8px)", background: "rgba(6,16,30,0.85)" },
       
      }}
    >
      {/* Handle bar */}
      <div className="w-10 h-1 rounded-full mx-auto mb-6 bg-white/20" />

      {/* Offer strip */}
      {/* <div className="flex items-center gap-3 p-3 rounded-xl mb-5"
        style={{ background: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.2)" }}>
        <GiftOutlined className="text-orange-400 text-xl flex-shrink-0" />
        <p className="text-xs font-semibold text-orange-300">
          First order: 20% off + free glass bottle worth ₹49!
        </p>
      </div> */}

      <h2 className="text-white font-bold text-2xl mb-1">Sign in to AquaPure</h2>
      <p className="text-white/50 text-sm mb-5">Enter your number to get an OTP</p>

      {/* Mobile / Email toggle */}
      <div className="flex gap-0 bg-black/30 rounded-xl p-1 mb-5 border border-white/10">
        {["mobile", "email"].map(t => (
          <button key={t} onClick={() => { setLoginType(t); setStep("phone") }}
            className="flex-1 py-2 rounded-lg text-sm font-semibold capitalize transition-all"
            style={loginType === t
              ? { background: "rgba(52,211,153,0.2)", color: "#34d399", border: "1px solid rgba(52,211,153,0.3)" }
              : { color: "rgba(255,255,255,0.4)", border: "1px solid transparent" }
            }>
            {t === "mobile" ? "📱 Mobile" : "📧 Email"}
          </button>
        ))}
      </div>

      <Form form={form} layout="vertical" size="large">

        {/* Step 1: Phone or Email input */}
        {step === "phone" && (
          <>
            {loginType === "mobile" ? (
              <div className="mb-4">
                <label className="text-xs font-bold uppercase tracking-wider text-white/40 block mb-2">
                  Mobile Number
                </label>
                <Input
                  prefix={<span className="text-white/40 font-bold pr-2 mr-1 border-r border-white/15">+91</span>}
                  placeholder="98765 43210"
                  maxLength={10}
                  value={phone}
                  onChange={e => setPhone(e.target.value.replace(/\D/g, ""))}
                  className="h-12"
                />
              </div>
            ) : (
              <Form.Item name="email" label={<span className="text-white/40 text-xs font-bold uppercase tracking-wider">Email</span>}
                rules={[{ type: "email", message: "Enter a valid email" }]} className="!mb-4">
                <Input prefix={<MailOutlined className="text-white/30" />}
                  placeholder="your@email.com" className="h-12" />
              </Form.Item>
            )}
            <Button type="primary" block size="large" loading={loading}
              onClick={handleSendOtp} className="!rounded-2xl !font-bold !h-12 !text-base">
              Send OTP
            </Button>
          </>
        )}

        {/* Step 2: OTP input */}
        {step === "otp" && (
          <>
            <p className="text-xs text-white/40 mb-3">
              OTP sent to <span className="text-emerald-400 font-bold">+91 {phone}</span> ·{" "}
              <span className="underline cursor-pointer" onClick={() => setStep("phone")}>Change</span>
            </p>
            <Form.Item name="otp" label={<span className="text-white/40 text-xs font-bold uppercase tracking-wider">Enter OTP</span>}
              rules={[{ required: true, message: "Enter the OTP" }]} className="!mb-5">
              <Input.OTP length={6} className="w-full" />
            </Form.Item>
            <div className="flex justify-between text-xs text-white/30 mb-4">
              <span>Resend in <span className="text-emerald-400 font-bold">28s</span></span>
              <span className="cursor-pointer underline" onClick={() => setStep("phone")}>Wrong number?</span>
            </div>
            <Button type="primary" block size="large" loading={loading}
              onClick={handleVerify} className="!rounded-2xl !font-bold !h-12 !text-base">
              Verify & Continue →
            </Button>
          </>
        )}

      </Form>

      {/* Social login */}
      <Divider className="!text-white/25 !text-xs !my-5">or continue with</Divider>
      <div className="flex gap-3">
        {[{ icon: <GoogleOutlined />, label: "Google" }, { icon: <FacebookOutlined />, label: "Facebook" }].map(s => (
          <button key={s.label}
            className="flex-1 h-11 rounded-xl flex items-center justify-center gap-2
              text-sm font-semibold text-white/60
              bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
            {s.icon} {s.label}
          </button>
        ))}
      </div>

      <p className="text-center text-xs text-white/30 mt-5 cursor-pointer" onClick={handleClose}>
        Skip for now ·{" "}
        <span className="text-emerald-400 font-semibold">Browse without account</span>
      </p>
    </Modal>
  )
}