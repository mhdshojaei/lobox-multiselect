import React, { useState } from 'react';
import MultiSelect from './components/MultiSelect';
import './App.scss';

type Option = {
  label: string;
  value: string;
};

function App() {
  const options: Option[] = [
    { label: 'React', value: 'react' },
    { label: 'Vue', value: 'vue' },
    { label: 'Angular', value: 'angular' },
    { label: 'Svelte', value: 'svelte' },
  ];

  const [selectedItems, setSelectedItems] = useState<Option[]>([]);

  const handleChange = (items: Option[]) => {
    setSelectedItems(items);
  };

  return (
    <div className='app-container'>
      <h1 className='title'>Lobox Multi Select</h1>
      <MultiSelect
        options={options}
        onChange={handleChange}
      />
    </div>
  );
}

export default App;
