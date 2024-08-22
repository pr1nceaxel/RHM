// export const EmployeArchive = () => {
//   return (
//     <div>EmployeeArchive</div>
//   )
// }


// import React from 'react';
import { Table, Tag, Avatar } from 'antd';

const columns = [
  {
    title: 'Salarié',
    dataIndex: 'employee',
    key: 'employee',
    render: (text, record) => (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Avatar style={{ backgroundColor: '#87d068' }}>{record.avatarInitials}</Avatar>
        <span style={{ marginLeft: 8 }}>{text}</span>
      </div>
    ),
  },
  {
    title: 'N°',
    dataIndex: 'number',
    key: 'number',
  },
  {
    title: 'Début',
    dataIndex: 'start',
    key: 'start',
  },
  {
    title: 'Fin',
    dataIndex: 'end',
    key: 'end',
  },
  {
    title: 'Durée',
    dataIndex: 'duration',
    key: 'duration',
  },
  {
    title: 'État',
    dataIndex: 'status',
    key: 'status',
    render: status => (
      <Tag color="orange" style={{ borderRadius: '10px', padding: '0 8px' }}>
        {status}
      </Tag>
    ),
  },
];

const data = [
  {
    key: '1',
    employee: 'fulgence bamba',
    avatarInitials: 'FB',
    number: 2,
    start: 'sam. 24 août 2024, 08:00',
    end: 'dim. 8 sept. 2024, 01:00',
    duration: '15 jours',
    status: 'En attente',
  },
  {
    key: '2',
    employee: 'STEPHANE JUNIOR DOMI',
    avatarInitials: 'SD',
    number: 1,
    start: 'sam. 24 août 2024, 08:00',
    end: 'dim. 8 sept. 2024, 01:00',
    duration: '15 jours',
    status: 'En attente',
  },
];

const EmployeArchive = () => (
  <Table columns={columns} dataSource={data} pagination={false} />
);

export default EmployeArchive;
