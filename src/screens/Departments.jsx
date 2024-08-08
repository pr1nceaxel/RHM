import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

  const navigate = useNavigate();

  const [rowData, setRowData] = useState([
    {
      id_dep:"1",
      label: "Développement",
      leader: "Jean Dupont",
      des_dep:"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      number_of_post:"3",
      
    },
    {
      id_dep:"2",
      label: "Ressources Humaines",
      leader: "Marie Curie",
      des_dep:"bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
      number_of_post:"2",
      
    },
    {
      id_dep:"3",
      label: "Finance",
      leader: "Louis Pasteur",
      des_dep:"ccccccccccccccccccccccccccccccccccc",
      number_of_post:"2",
      
    },
    {
      id_dep:"4",
      label: "Marketing",
      leader: "Claude Monet",
      des_dep:"ddddddddddddddddddddddddddddddddd",
      number_of_post:"2",
      
    },
  ]);

  const [colDefs, setColDefs] = useState([
    { field: "label", headerName: "Label du Département" },
    { field: "leader", headerName: "Responsable" },
    { field: "number_of_post", headerName: "Nombre de post" },

    // { field: "des_dep", headerName: "description du post" },
    // { field: "", headerName: "Localisation" },
    // { field: "creationDate", headerName: "Date de Création" },
    // { field: "Action", headerName: "Action" },

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

  const handleRowClick = (event) => {
    const { id_dep, label, leader,des_dep , number_of_post } = event.data;
    navigate(`/home/company/Departments/CreateDep?id_dep=${id_dep}&label=${label}&leader=${leader}&des_dep=${des_dep}&number_of_post=${number_of_post}`);
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
          onRowClicked={handleRowClick}

        />
      </div>

      {/* formulaire_cache */}

      <Modal
        title="Créer un Nouveau département"
        open={isModalVisible}
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


        </Form>
      </Modal>
    </div>
  );
};