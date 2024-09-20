/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {

            colors: {
                'chefchaouen_blue': {
                    DEFAULT: '#4392f1',
                    100: '#041c39',
                    200: '#093872',
                    300: '#0d54ab',
                    400: '#1170e4',
                    500: '#4392f1',
                    600: '#67a6f4',
                    700: '#8dbdf6',
                    800: '#b3d3f9',
                    900: '#d9e9fc'
                },
                'magnolia': {
                    DEFAULT: '#ece8ef',
                    100: '#302637',
                    200: '#604d6f',
                    300: '#9078a1',
                    400: '#bdb0c8',
                    500: '#ece8ef',
                    600: '#efecf2',
                    700: '#f3f1f5',
                    800: '#f7f5f8',
                    900: '#fbfafc'
                },
                'lavender_(web)': {
                    DEFAULT: '#e3ebff',
                    100: '#001b61',
                    200: '#0037c2',
                    300: '#2462ff',
                    400: '#85a7ff',
                    500: '#e3ebff',
                    600: '#ebf0ff',
                    700: '#f0f4ff',
                    800: '#f5f8ff',
                    900: '#fafbff'
                },
                'alice_blue': {
                    DEFAULT: '#e7f0ff',
                    100: '#002461',
                    200: '#0047c2',
                    300: '#2474ff',
                    400: '#85b1ff',
                    500: '#e7f0ff',
                    600: '#ebf2ff',
                    700: '#f0f5ff',
                    800: '#f5f9ff',
                    900: '#fafcff'
                },
                'vermilion': {
                    DEFAULT: '#dc493a',
                    100: '#300c08',
                    200: '#5f1911',
                    300: '#8f2519',
                    400: '#bf3122',
                    500: '#dc493a',
                    600: '#e37063',
                    700: '#ea948a',
                    800: '#f1b7b1',
                    900: '#f8dbd8'
                }
            },
        },
    },
    plugins: [],
}

