# 🔽 Lobox Multi-Select Component

A reusable multi-select dropdown component built with **React**, **TypeScript**,
and **SCSS**.  
Users can **select**, **unselect**, and **add new items** dynamically. Includes
dropdown animation, outside click handling, and search filtering.

## ✨ Features

- ✅ Select multiple items
- ✅ Search and filter options
- ✅ Add new items by typing + pressing `Enter`
- ✅ Remove selected items by clicking them again
- ✅ Close dropdown on outside click
- ✅ Smooth dropdown animations
- ✅ Responsive and accessible styles

## 🚀 Getting Started

This project was bootstrapped with
[Create React App](https://github.com/facebook/create-react-app).

### 📦 Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/your-username/lobox-multiselect.git
cd lobox-multiselect
npm install
```

### 🧪 Development Server

To run the app locally:

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the
result.

### 🏗 Production Build

To create an optimized production build:

```bash
npm run build
```

## 🧱 Component Usage

```tsx
import MultiSelect from './components/MultiSelect';

const options = [
  { label: 'React', value: 'react' },
  { label: 'Vue', value: 'vue' },
  { label: 'Angular', value: 'angular' },
];

<MultiSelect
  options={options}
  onChange={(selected) => console.log(selected)}
/>;
```

## 📁 Project Structure

```
.
├── public
├── src
│   ├── components
│   │   └── MultiSelect.tsx
│   │   └── MultiSelect.scss
│   ├── types
│   │   └── index.ts
│   ├── App.tsx
│   ├── App.scss
│   └── index.tsx
├── package.json
└── README.md
```

## 🛠 Technologies

- ⚛️ React
- ⛑ TypeScript
- 🎨 SCSS
- 🧠 nanoid (for generating unique IDs)
- 💡 React hooks (`useState`, `useRef`, `useEffect`)

## 📃 License

MIT — Free for personal and commercial use.

---

Let’s build better UIs 🚀
