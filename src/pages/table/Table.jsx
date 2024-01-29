import React, { useState } from 'react';
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from 'antd';
import { deleteIcon, table } from '../../assets';

const originData = [];
for (let i = 0; i < 1000; i++) {
  originData.push({
    key: i.toString(),
    id: i,
    name: `Акбарали Хасанов`,
    age: 32,
    phoneNumbers: [''],
    orders: 100,
    userType: 'Клиент',
    createdAt: '17.07.2023, 12:30',
  });
}

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode =
    inputType === 'number' ? (
      <InputNumber />
    ) : (
      <Input
        placeholder="Phone Number"
        onChange={(e) => {
          const value = e.target.value;
          if (!value.startsWith('+7')) {
            e.target.value = '+7';
          }
        }}
      />
    );

  const additionalInputNode = (
    <Input
      addonBefore="+7"
      placeholder="Additional Phone Number"
      onChange={(e) => {
      }}
    />
  );

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
          {dataIndex === 'phoneNumbers' && additionalInputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const EditableTable = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      name: '',
      age: '',
      address: '',
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: '№',
      dataIndex: 'key',
      width: '30px',
      editable: true,
    },
    {
      title: 'ID водителя',
      dataIndex: 'id',
      width: '10%',
      editable: true,
    },
    {
      title: 'ФИО водителя',
      dataIndex: 'name',
      width: '20%',
      editable: true,
    },
    {
      title: 'Номер телефона',
      dataIndex: 'phoneNumbers',
      width: '15%',
      editable: true,
      render: (_, record) => (
        <span>
          {record.phoneNumbers.map((phone, index) => (
            <p key={index}>{`+7 ${phone}`}</p>
          ))}
        </span>
      ),
    },
    {
      title: 'Все заказы',
      dataIndex: 'orders',
      width: '12%',
      editable: true,
    },
    {
      title: 'Тип пользователя',
      dataIndex: 'userType',
      width: '18%',
      editable: true,
    },
    {
      title: 'Дата создание',
      dataIndex: 'createdAt',
      width: '18%',
      editable: true,
    },
    {
      title: <img src={table} alt="table" width={20} height={20} />,
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            <img src={deleteIcon} alt="Delete" />
          </Typography.Link>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <Form form={form} component={false}>
      <div>
        <div className='flex items-center justify-between p-4'>
          <h1 className='color-[#1A2024] font-[20px]' style={{
            fontWeight: '700',
            lineHeight : '24px',
            letterSpacing: '-0.28px'
          }}>Все водители</h1>
          <button className='flex items-center justify-center gap-[8px] bg-[#36AD49] text-white font-[14px] rounded-[6px]' style={{
            padding: '4px 12px 4px 8px'
          }}><p>+</p>Добавить</button>
        </div>
      </div>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
        responsive={['md', 'lg', 'xl']}
      />
    </Form>
  );
};

export default EditableTable;
