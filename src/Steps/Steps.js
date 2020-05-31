import React from 'react';
import StepModel from './StepModel';
import StepAddForm from '../StepAddForm/StepAddForm';
import StepList from '../StepList/StepList';
import './Steps.css';

export default function Steps(props) {
  const [ steps, setSteps ] = React.useState([]);
  const [ editingStepID, setEditingStepID ] = React.useState();
  const [ form, setForm ] = React.useState({ date: '', distance: '' });

  const handleChange = (name, value) => {
    setForm(prevForm => ({...prevForm, [name]: value}));
  };

  const handleSubmit = () => {
    const { date, distance } = form;

    if (editingStepID) {
      const oldDate = steps.find((o) => o.id === editingStepID).date;
      setSteps((prevSteps) => prevSteps.map((o) => {
        if (o.date === oldDate) return new StepModel(date, Number(distance));
        return o;
      }));
    } else {
      if (steps.find((o) => o.date === date)) {
        setSteps((prevSteps) => prevSteps.map((o) => {
          if (o.date === date) return new StepModel(date, Number(distance) + o.distance);
          return o;
        }));
      } else {
        setSteps((prevSteps) => [...prevSteps, new StepModel(date, Number(distance))]);
      }
    }
    
    setForm({ date: '', distance: '' });
    setEditingStepID(null);
  }

  const handleRemove = (id) => {
    setSteps((prevSteps) => prevSteps.filter((o) => o.id !== id));
  }

  const handleEdit = (id) => {
    const step = steps.find((o) => o.id === id);
    setEditingStepID(step.id);
    setForm({ date: step.date, distance: step.distance });
  }

  return (
    <div className='steps'>
      <StepAddForm
        form={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      <StepList steps={steps} onRemove={handleRemove} onEdit={handleEdit}/>
    </div>
  )
}
