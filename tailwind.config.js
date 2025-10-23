/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef8ff",
          100: "#d9efff",
          200: "#bce3ff",
          300: "#8fd2ff",
          400: "#5bbaff",
          500: "#2f9dff",
          600: "#1c7df5",
          700: "#165fcc",
          800: "#164f9f",
          900: "#153f7d"
        }
      }
    }
  },
  // 生产环境优化
  future: {
    hoverOnlyWhenSupported: true, // 只在支持 hover 的设备上启用
  },
  // 精确模式：移除所有未使用的类
  safelist: [],
  // 不生成未使用的变体
  corePlugins: {
    preflight: true,
    // 按需禁用不需要的功能
    float: false,
    clear: false,
    skew: false,
    caretColor: false,
    sepia: false,
  },
  plugins: []
};
