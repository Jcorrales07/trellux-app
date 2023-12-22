import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

const colors = {
    brand: {
        white: '#FFFFFF',
        100: '#F7FAFC',
        200: '#EDF2F7',
        300: '#E2E8F0',
        400: '#CBD5E0',
        500: '#A0AEC0',
        600: '#718096',
        700: '#4A5568',
        800: '#2D3748',
        900: '#1A202C',
        black: '#000000',
    },
}

const theme = extendTheme({ colors })

ReactDOM.createRoot(document.getElementById('root')).render(
    // <React.StrictMode>
    <ChakraProvider theme={theme}>
        <App />
    </ChakraProvider>
    // </React.StrictMode>
)
