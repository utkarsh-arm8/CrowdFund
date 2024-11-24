import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

import { useStateContext } from '../context';
import { money } from '../assets';
import { CustomButton, FormField, Loader } from '../components';
import { checkIfImage } from '../utils';

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { createCampaign } = useStateContext();
  const [form, setForm] = useState({
    name: '',
    title: '',
    description: '',
    target: '',
    deadline: '',
    image: '',
    phases: [{ name: '', percentage: '' }] // Initial phase structure
  });

  // Handle field changes
  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  // Handle phase changes
  const handlePhaseChange = (index, fieldName, value) => {
    const updatedPhases = [...form.phases];
    updatedPhases[index][fieldName] = value;
    setForm({ ...form, phases: updatedPhases });
  };

  // Add a new phase
  const addPhase = () => {
    setForm({ ...form, phases: [...form.phases, { name: '', percentage: '' }] });
  };

  // Remove a phase
  const removePhase = (index) => {
    const updatedPhases = form.phases.filter((_, i) => i !== index);
    setForm({ ...form, phases: updatedPhases });
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate percentage allocation
    const totalPercentage = form.phases.reduce((sum, phase) => sum + Number(phase.percentage || 0), 0);
    if (totalPercentage !== 100) {
      alert('The total allocation percentage must equal 100%.');
      return;
    }

    checkIfImage(form.image, async (exists) => {
      if (exists) {
        setIsLoading(true);
        await createCampaign({ ...form, target: ethers.utils.parseUnits(form.target, 18) });
        setIsLoading(false);
        navigate('/');
      } else {
        alert('Provide a valid image URL');
        setForm({ ...form, image: '' });
      }
    });
  };

  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && <Loader />}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">Start a Campaign</h1>
      </div>

      <form onSubmit={handleSubmit} className="w-full mt-[65px] flex flex-col gap-[30px]">
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Your Name *"
            placeholder="John Doe"
            inputType="text"
            value={form.name}
            handleChange={(e) => handleFormFieldChange('name', e)}
          />
          <FormField
            labelName="Campaign Title *"
            placeholder="Write a title"
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFormFieldChange('title', e)}
          />
        </div>

        <FormField
          labelName="Story *"
          placeholder="Write your story"
          isTextArea
          value={form.description}
          handleChange={(e) => handleFormFieldChange('description', e)}
        />

        <div className="w-full flex justify-start items-center p-4 bg-[#8c6dfd] h-[120px] rounded-[10px]">
          <img src={money} alt="money" className="w-[40px] h-[40px] object-contain" />
          <h4 className="font-epilogue font-bold text-[25px] text-white ml-[20px]">You will get 100% of the raised amount</h4>
        </div>

        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Goal *"
            placeholder="ETH 0.50"
            inputType="text"
            value={form.target}
            handleChange={(e) => handleFormFieldChange('target', e)}
          />
          <FormField
            labelName="End Date *"
            placeholder="End Date"
            inputType="date"
            value={form.deadline}
            handleChange={(e) => handleFormFieldChange('deadline', e)}
          />
        </div>

        <FormField
          labelName="Campaign Image *"
          placeholder="Place image URL of your campaign"
          inputType="url"
          value={form.image}
          handleChange={(e) => handleFormFieldChange('image', e)}
        />

        {/* Phases */}
        <div className="flex flex-col gap-[20px]">
          <h3 className="font-epilogue font-bold text-[18px] text-white">Phase Allocation</h3>
          {form.phases.map((phase, index) => (
            <div key={index} className="flex items-center gap-[10px]">
              <FormField
                labelName={`Phase ${index + 1} Name *`}
                placeholder="Phase name"
                inputType="text"
                value={phase.name}
                handleChange={(e) => handlePhaseChange(index, 'name', e.target.value)}
              />
              <FormField
                labelName="Allocation % *"
                placeholder="e.g., 50"
                inputType="number"
                value={phase.percentage}
                handleChange={(e) => handlePhaseChange(index, 'percentage', e.target.value)}
              />
              {index > 0 && (
                <button
                  type="button"
                  className="text-red-500 font-bold"
                  onClick={() => removePhase(index)}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            className="bg-[#1dc071] text-white font-bold px-4 py-2 rounded-[10px]"
            onClick={addPhase}
          >
            Add Phase
          </button>
        </div>

        <div className="flex justify-center items-center mt-[40px]">
          <CustomButton
            btnType="submit"
            title="Submit new campaign"
            styles="bg-[#1dc071]"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateCampaign;
