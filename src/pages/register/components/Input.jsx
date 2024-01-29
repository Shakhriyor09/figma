
import React from 'react';

const Input = ({ placeholder, ...props }) => {
  return (
    <input
      className='w-[538px] h-[48px] flex items-center justify-between self-stretch rounded-[6px] bg-[#FFF] outline-none p-3'
      placeholder={placeholder}
      {...props} style={{
        border : '1px solid #E5E9EB'
      }}
    />
  );
};

export default Input;
