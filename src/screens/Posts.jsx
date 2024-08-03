import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useState } from "react";
import { Button, Modal, Form, Input, InputNumber, Mentions, Select, Cascader, TreeSelect, DatePicker } from "antd";

const { RangePicker } = DatePicker;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

export const Posts = () => {
  const [rowData, setRowData] = useState([
    {
      label: "Développeur Full Stack",
      leader: "Jean Dupont",
      datePosted: "2024-08-01",
      status: "Ouvert",
      Number_of_Employee: "2",
    },
    {
      label: "Responsable RH",
      leader: "Marie Curie",
      datePosted: "2024-07-20",
      status: "Fermé",
      Number_of_Employee: "1",

    },
    {
      label: "Comptable",
      leader: "Louis Pasteur",
      datePosted: "2024-07-15",
      status: "Ouvert",
      Number_of_Employee: "2",
      
    },
    {
      label: "Assistant Marketing",
      leader: "Claude Monet",
      datePosted: "2024-06-30",
      status: "En Cours",
      Number_of_Employee: "3",
    },
  ]);

  const onStatusChange = (value) => {
    switch (value) {
      case 'Ouvert':
        form.setFieldsValue({
          // note: 'Hi, man!',
        });
        break;
      case 'Fermé':
        form.setFieldsValue({
          // note: 'Hi, lady!',
        });
        break;
      case 'en Cours':
        form.setFieldsValue({
          // note: 'Hi there!',
        });
        break;
      default:
    }

  };


  const [colDefs, setColDefs] = useState([
    { field: "label", headerName: "Label du Poste" },
    { field: "leader", headerName: "Responsable" },
    { field: "datePosted", headerName: "Date de Publication" },
    {
      field: "status",
      headerName: "Statut",
      cellRenderer: (params) => {
        switch (params.value) {
          case "Ouvert":
            return "🟢 Ouvert";
          case "Fermé":
            return "🔴 Fermé";
          case "En Cours":
            return "🟠 En Cours";
          default:
            return params.value;
        }
      },
    },    
    { field: "Number_of_Employee", headerName: "Number of Employee" },
    { field: "Action", headerName: "Action" },


  ]);

  const defaultColDef = {
    flex: 1,
    sortable: true,
    filter: true,
    floatingFilter: true,
  };

  const pagination = true;
  const paginationPageSize = 500;
  const paginationPageSizeSelector = [200, 500, 1000];

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="mx-5 py-3">
      <div className="flex mx-2 justify-between my-3">
        <div className="">
          <h1 className="text-xl font-bold">Postes</h1>
          <p>
            Voici la liste des postes disponibles au sein de notre entreprise.
          </p>
        </div>
        <div>
          <Button type="primary" size="large" onClick={showModal}>
            Nouveau postes
          </Button>
        </div>
      </div>
      <div className="ag-theme-quartz" style={{ height: 500 }}>
        <AgGridReact
          pagination={pagination}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
          rowData={rowData}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
        />
      </div>



      {/* formulaire_cache */}
      <Modal
        title="Créer un Nouveau Poste"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Annuler
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Soumettre
          </Button>,
        ]}
      >
        <Form {...formItemLayout} style={{ maxWidth: 600 }}  initialValues={{ Number_of_Employee: 0 }}>
          <Form.Item label="Label" name="label" rules={[{ required: true, message: 'Champs vide!' }]}>
            <Input placeholder="Nom du post"/>
          </Form.Item>

          <Form.Item label="Responsable" name="responsable" rules={[{ required: true, message: 'Champs vide!' }]}>
            <Input placeholder="Nom du responsable"/>
          </Form.Item>

          <Form.Item
            label="Description"
            name="description_post"
            rules={[{ required: true, message: 'Champs vide!' }]}
          >
            <Input.TextArea placeholder="Description du post"/>
          </Form.Item>

          <Form.Item
            name="status"
            label="status"
            rules={[
              {
                required: true,
              },
            ]}
          >
          <Select
            placeholder="Select a option and change input text above"
            onChange={onStatusChange}
            allowClear
          >
            <Option value="Ouvert">Ouvert</Option>
            <Option value="Fermé">Fermé</Option>
            <Option value="Encour">En Cours</Option>
          </Select>
        </Form.Item>     

        <Form.Item label="Nombre" name="Number_of_Employee" rules={[{ required: true, message: 'Champs vide!' }]}
        >
          <InputNumber />
        </Form.Item>

        {/* <Form.Item
          name="note"
          label="Note"
          rules={[
            {
              required: true,
              message: 'Champs vide!'
            },
          ]}
        >
            <Input />
          </Form.Item> */}

          {/* <Form.Item
            label="InputNumber"
            name="InputNumber"
            rules={[{ required: true, message: 'Please input!' }]}
          >
            <InputNumber style={{ width: '100%' }} />
          </Form.Item> */}


          {/* <Form.Item
            label="Mentions"
            name="Mentions"
            rules={[{ required: true, message: 'Please input!' }]}
          >
            <Mentions />
          </Form.Item> */}



          {/* <Form.Item
            label="Cascader"
            name="Cascader"
            rules={[{ required: true, message: 'Please input!' }]}
          >
            <Cascader />
          </Form.Item>

          <Form.Item
            label="TreeSelect"
            name="TreeSelect"
            rules={[{ required: true, message: 'Please input!' }]}
          >
            <TreeSelect />
          </Form.Item>

          <Form.Item
            label="DatePicker"
            name="DatePicker"
            rules={[{ required: true, message: 'Please input!' }]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            label="RangePicker"
            name="RangePicker"
            rules={[{ required: true, message: 'Please input!' }]}
          >
            <RangePicker />
          </Form.Item> */}
        </Form>
      </Modal>
    </div>
  );
};
