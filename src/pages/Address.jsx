import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Input, Button, message, Form } from "antd"
import { HomeOutlined, BankOutlined, EnvironmentOutlined, PlusOutlined, CheckOutlined } from "@ant-design/icons"
import { useAddress } from "../context/AddressContext"

// Dummy saved addresses — treat like a mini CRUD
// const DUMMY_ADDRESSES = [
//   { id: 1, type: "Home", name: "Arjun Kumar",  line1: "12-B, Sector 4, Gomti Nagar", city: "Lucknow", pin: "226010", phone: "+91 98765 43210" },
//   { id: 2, type: "Work", name: "Arjun Kumar",  line1: "Office Park, Vibhuti Khand",  city: "Lucknow", pin: "226021", phone: "+91 98765 43210" },
// ]

const TYPE_OPTS = [
  { key: "Home",  icon: <HomeOutlined /> },
  { key: "Work",  icon: <BankOutlined /> },
  { key: "Other", icon: <EnvironmentOutlined /> },
]

export default function Address() {
  const navigate               = useNavigate()
  const {
address,setAddress,selectedAddressId, setSelectedAddressId

} = useAddress()
  // const [addresses, setAddresses] = useState(DUMMY_ADDRESSES)
  // const [selected, setSelected]   = useState(1)        // selected address id
  const [showForm, setShowForm]   = useState(false)
  const [addrType, setAddrType]   = useState("Home")
  const [form] = Form.useForm()

  // CREATE — save new address
  function handleSave() {
    form.validateFields().then(values => {
      const newAddr = {
        id:    Date.now(),
        type:  addrType,
        name:  values.name,
        line1: values.line1,
        city:  values.city,
        pin:   values.pin,
        phone: values.phone,
      }
      setAddress(prev => [...prev, newAddr])   // CREATE
      setSelectedAddressId(newAddr.id)
      setShowForm(false)
      form.resetFields()
      message.success("Address saved!")
    })
  }

  // DELETE
 function handleDelete(id) {
  const updated = address.filter(a => a.id !== id)

  setAddress(updated)

  if (selectedAddressId === id) {
    setSelectedAddressId(updated[0]?.id || null)
  }

  message.success("Address removed")
}

  return (
    <div className="py-4 space-y-4 max-w-3xl mx-auto px-2.5">

      {/* Header */}
      <div>
        <h2 className="text-white font-bold text-xl">Delivery Address</h2>
        <p className="text-white/40 text-xs mt-1">Where should we deliver your order?</p>
      </div>

      {/* ── Saved addresses ── */}
      {address.map(addr => (
        <div key={addr.id}
          onClick={() => setSelectedAddressId(addr.id)}
          className="relative p-4 rounded-2xl cursor-pointer transition-all"
          style={selectedAddressId === addr.id
            ? { background: "rgba(0,212,170,0.1)",   border: "1px solid rgba(0,212,170,0.3)" }
            : { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }
          }>

          {/* Type tag */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg mb-2 text-[11px] font-bold"
            style={addr.type === "Home"
              ? { background: "rgba(0,212,170,0.15)", color: "#00d4aa" }
              : { background: "rgba(79,142,247,0.15)", color: "#4f8ef7" }
            }>
            {addr.type === "Home" ? <HomeOutlined /> : <BankOutlined />} {addr.type}
          </div>

          <p className="text-white font-bold text-sm">{addr.name}</p>
          <p className="text-white/50 text-xs mt-1 leading-relaxed">
            {addr.line1}<br />{addr.city} · {addr.pin}<br />{addr.phone}
          </p>

          {/* Radio dot */}
          <div className="absolute top-4 right-4 w-5 h-5 rounded-full flex items-center justify-center"
            style={selectedAddressId === addr.id
              ? { background: "rgba(0,212,170,0.15)", border: "2px solid #00d4aa" }
              : { border: "2px solid rgba(255,255,255,0.2)" }
            }>
            {selectedAddressId === addr.id && <CheckOutlined className="text-emerald-400 text-[10px]" />}
          </div>

          {/* Delete */}
          <button
            onClick={e => { e.stopPropagation(); handleDelete(addr.id) }}
            className="absolute bottom-4 right-4 text-[11px] font-semibold px-2 py-0.5 rounded-lg
              text-red-400/70 hover:text-red-400 transition-all"
            style={{ background: "rgba(255,80,80,0.08)" }}>
            Remove
          </button>
        </div>
      ))}

      {/* ── Add new address toggle ── */}
      <button
        onClick={() => setShowForm(p => !p)}
        className="w-full flex items-center gap-3 p-4 rounded-2xl transition-all"
        style={{ border: "2px dashed rgba(255,255,255,0.12)", background: "transparent" }}>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
          <PlusOutlined className="text-emerald-400" />
        </div>
        <div className="text-left">
          <p className="text-white font-bold text-sm">Add new address</p>
          <p className="text-white/35 text-xs">Save home, work or other</p>
        </div>
      </button>

      {/* ── Add new address form ── */}
      {showForm && (
        <div className="p-5 rounded-2xl space-y-3"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>

          <p className="text-white font-bold text-sm mb-3">New Address</p>

          {/* Type selector */}
          <div className="flex gap-2 mb-2">
            {TYPE_OPTS.map(t => (
              <button key={t.key}
                onClick={() => setAddrType(t.key)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                style={addrType === t.key
                  ? { background: "rgba(0,212,170,0.15)", border: "1px solid rgba(0,212,170,0.3)", color: "#00d4aa" }
                  : { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.4)" }
                }>
                {t.icon} {t.key}
              </button>
            ))}
          </div>

          <Form form={form} layout="vertical" size="middle">
            <Form.Item name="name"  label={<span className="text-white/40 text-xs">Full name</span>}  rules={[{ required: true }]} className="!mb-2">
              <Input placeholder="Your full name" className="!rounded-xl" />
            </Form.Item>
            <Form.Item name="line1" label={<span className="text-white/40 text-xs">Flat / House, Street</span>} rules={[{ required: true }]} className="!mb-2">
              <Input placeholder="e.g. 12-B, Gomti Nagar" className="!rounded-xl" />
            </Form.Item>
            <div className="grid grid-cols-2 gap-2">
              <Form.Item name="city" label={<span className="text-white/40 text-xs">City</span>} rules={[{ required: true }]} className="!mb-2">
                <Input placeholder="Lucknow" className="!rounded-xl" />
              </Form.Item>
              <Form.Item name="pin" label={<span className="text-white/40 text-xs">PIN Code</span>} rules={[{ required: true, len: 6 }]} className="!mb-2">
                <Input placeholder="226010" maxLength={6} className="!rounded-xl" />
              </Form.Item>
            </div>
            <Form.Item name="phone" label={<span className="text-white/40 text-xs">Phone</span>} rules={[{ required: true }]} className="!mb-3">
              <Input prefix="+91" placeholder="98765 43210" className="!rounded-xl" />
            </Form.Item>
            <Button type="primary" block onClick={handleSave} className="!rounded-xl !font-bold">
              Save Address
            </Button>
          </Form>
        </div>
      )}

      {/* Continue CTA */}
      <Button type="primary" block size="large"
        onClick={() => navigate("/payment")}
        className="!rounded-2xl !font-bold !h-14 !text-base !mt-2">
        Continue to Payment →
      </Button>

    </div>
  )
}