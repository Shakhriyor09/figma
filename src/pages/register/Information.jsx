import React from 'react';
import Input from './components/Input';
import { close } from '../../assets';

const Information = () => {
  return (
      <div className="container " style={{ width: '740px', height: '495px', margin: 'auto' }}>
        <div className='flex justify-between items-center p-4'>
          <h2 style={{
            fontSize: '20px',
            fontWeight: '600',
            lineHeight: '24px',
            letterSpacing: '-0.28px',
            color: '#1A2024',
            margin: 0
          }}>Все водители</h2>
          <img src={close} alt="" />
        </div>
        <hr />
        <div className='mt-8'>
          {[
            'ID водителя',
            'ФИО водителя',
            'Сумма вне города',
            'Сумма вне города',
            'Сумма вне города',
            'Номер телефона',
          ].map((label, index) => (
            <div key={index} className='flex justify-between items-center p-4'>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#252C32' , paddingRight: '18px' }}>{label}</h3>
              <Input placeholder={label === 'Номер телефона' ? 'Phone Number...' : `Введите ${label}`} style={{ marginLeft: '16px' }} />
            </div>
          ))}
        </div>
        <div className='text-right mt-[14px]'>
          <button className='w-[242.5px] h-[40px] bg-[#FFF] font-[500] text-[green] rounded-[6px]' style={{
            border : '1px solid #E5E9EB',
            marginRight: '24px'
          }} >Отменить</button>
          <button className='w-[242.5px] h-[40px] bg-[#36AD49] font-[500] text-white rounded-[6px] me-4' >Сохранить</button>
        </div>
      </div>
  );
};

export default Information;
