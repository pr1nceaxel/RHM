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

export const Departments = () => {
  const [rowData, setRowData] = useState([
    {
      label: "Développement",
      leader: "Jean Dupont",
      location: "Paris",
      budget: "200,000€",
      creationDate: "2022-03-01",
    },
    {
      label: "Ressources Humaines",
      leader: "Marie Curie",
      location: "Lyon",
      budget: "150,000€",
      creationDate: "2021-07-15",
    },
    {
      label: "Finance",
      leader: "Louis Pasteur",
      location: "Marseille",
      budget: "300,000€",
      creationDate: "2020-11-20",
    },
    {
      label: "Marketing",
      leader: "Claude Monet",
      location: "Nice",
      budget: "180,000€",
      creationDate: "2019-06-30",
    },
  ]);

  const [colDefs, setColDefs] = useState([
    { field: "label", headerName: "Label du Département" },
    { field: "leader", headerName: "Responsable" },
    { field: "location", headerName: "Localisation" },
    { field: "budget", headerName: "Budget" },
    { field: "creationDate", headerName: "Date de Création" },
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
        <div>
          <h1 className="text-xl font-bold">Départements</h1>
          <p>Voici la liste des départements au sein de notre entreprise.</p>
        </div>
        <div>
        <Button type="primary" size="large" onClick={showModal}>
            Nouveau Département
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
        title="Créer un Nouveau département"
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
            <Input placeholder="Nom du département"/>
          </Form.Item>

          <Form.Item label="Responsable" name="responsable" rules={[{ required: true, message: 'Champs vide!' }]}>
            <Input placeholder="Nom du responsable"/>
          </Form.Item>

          <Form.Item
            label="Description"
            name="description_dep"
            rules={[{ required: true, message: 'Champs vide!' }]}
          >
            <Input.TextArea placeholder="Description du département"/>
          </Form.Item>

          {/* <Form.Item
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
        </Form.Item>      */}

        {/* <Form.Item label="Nombre" name="Number_of_Employee" rules={[{ required: true, message: 'Champs vide!' }]}
        >
          <InputNumber />
        </Form.Item> */}


        </Form>
      </Modal>
    </div>
  );
};