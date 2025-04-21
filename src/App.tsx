import React, { useState } from 'react';
import MultiSelect from './components/MultiSelect';
import './App.scss';

type Option = {
  label: string;
  value: string;
};

function App() {
  const [selectedItems, setSelectedItems] = useState<Option[]>([
    { label: 'React', value: 'react' },
    { label: 'Vue', value: 'vue' },
    { label: 'Angular', value: 'angular' },
    { label: 'Svelte', value: 'svelte' },
  ]);

  const handleChange = (items: Option[]) => {
    setSelectedItems((prev) => {
      const existingLabels = new Set(prev.map((item) => item.label));
      const newItems = items.filter((item) => !existingLabels.has(item.label));
      return [...prev, ...newItems];
    });
  };

  return (
    <div className='app-container'>
      <h1 className='title'>Lobox Multi Select</h1>
      <MultiSelect
        options={selectedItems}
        onChange={handleChange}
      />
    </div>
  );
}

export default App;
