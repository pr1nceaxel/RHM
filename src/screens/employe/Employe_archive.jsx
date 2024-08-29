/* eslint-disable no-unused-vars */
import  { useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Avatar, Tag } from 'antd';
import { IoSearchOutline } from 'react-icons/io5';




const data = [
  {
    key: "1",
    employee: "fulgence bamba",
    avatarInitials: "FB",
    number: 2,
    start: "sam. 24 août 2024, 08:00",
    end: "dim. 8 sept. 2024, 01:00",
    duration: "15 jours",
    status: "En attente",
  },
  {
    key: "2",
    employee: "STEPHANE JUNIOR DOMI",
    avatarInitials: "SD",
    number: 1,
    start: "sam. 24 août 2024, 08:00",
    end: "dim. 8 sept. 2024, 01:00",
    duration: "15 jours",
    status: "En attente",
  },
];

const EmployeArchive = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<IoSearchOutline />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        // <Highlighter
        //   highlightStyle={{
        //     backgroundColor: '#ffc069',
        //     padding: 0,
        //   }}
        //   searchWords={[searchText]}
        //   autoEscape
        //   textToHighlight={text ? text.toString() : ''}
        // />
        <p>
          hello
        </p>
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Salarié",
      dataIndex: "employee",
      ...getColumnSearchProps('name'),
      key: "employee",
      render: (text, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar style={{ backgroundColor: "#87d068" }}>
            {record.avatarInitials}
          </Avatar>
          <span style={{ marginLeft: 8 }}>{text}</span>
        </div>
      ),
    },
    {
      title: "N°",
      dataIndex: "number",
      key: "number",
      sorter: (a, b) => a.number - b.number,
    },
    {
      title: "Début",
      dataIndex: "start",
      key: "start",
      sorter: (a, b) => a.start - b.start,
    },
    {
      title: "Fin",
      dataIndex: "end",
      key: "end",
    },
    {
      title: "Durée",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "État",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color="orange" style={{ borderRadius: "10px", padding: "0 8px" }}>
          {status}
        </Tag>
      ),
    },
  ];

  return (
    <>

      <Table columns={columns} dataSource={data} pagination={false} />
    </>
  );
};

export default EmployeArchive;


