import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ConfigProvider, theme } from 'antd'

createRoot(document.getElementById('root')).render(
  <StrictMode>
       <ConfigProvider

      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#00d4aa',
          borderRadius: 12,
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        },
      }}
    >
      <App />
    </ConfigProvider>
  </StrictMode>,
)
