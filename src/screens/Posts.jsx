import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal, Form, Input, InputNumber, Select, Space } from "antd";

const { Option } = Select;

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
  const navigate = useNavigate();


  const [rowData, setRowData] = useState([
    {
      id_p: 1,
      label: "Développeur Full Stack",
      leader: "Jean Dupont",
      description: "aaaaaaaaaaaaaaaaaaaaaa",
      datePosted: "2024-08-01",
      status: "Diponible",
      Number_of_Employee: "12",
    },
    {
      id_p: 2,
      label: "Responsable RH",
      leader: "Marie Curie",
      description: "bbbbbbbbbbbbbbbbbbbbbbbbb",
      datePosted: "2024-07-20",
      status: "Indiponible",
      Number_of_Employee: "1",
    },
    {
      id_p: 3,
      label: "Comptable",
      leader: "Louis Pasteur",
      description: "cccccccccccccccccccccccccc",
      datePosted: "2024-07-15",
      status: "Diponible",
      Number_of_Employee: "2",
    },
    {
      id_p: 4,
      label: "Assistant Marketing",
      leader: "Claude Monet",
      description: "dddddddddddddddddddddddddd",
      datePosted: "2024-06-30",
      status: "Indiponible",
      Number_of_Employee: "3",
    },
  ]);

  const onStatusChange = (value) => {
    switch (value) {
      case 'Diponible':
        form.setFieldsValue({});
        break;
      case 'Indiponible':
        form.setFieldsValue({});
        break;

      default:
    }
  };

  const [colDefs, setColDefs] = useState([
    { field: "label", headerName: "Label du Poste" },
    { field: "leader", headerName: "Responsable" },
    // { field: "description", headerName: "Description" },
    // { field: "datePosted", headerName: "Date de Publication" },
    {
      field: "status",
      headerName: "Statut",
      cellRenderer: (params) => {
        switch (params.value) {
          case "Diponible":
            return "🟢 Diponible";
          case "Indiponible":
            return "🔴 Indiponible";

          default:
            return params.value;
        }
      },
    },
    { field: "Number_of_Employee", headerName: "Nombre d'Employés" },
    // {
    //   headerName: "Action",
    //   cellRendererFramework: (params) => (
    //     <Space size="middle">
    //       <Button onClick={() => handleEdit(params.data)}>Modifier</Button>
    //       <Button onClick={() => handleDelete(params.data)}>Supprimer</Button>
    //       <Button onClick={() => handleViewMore(params.data)}>Voir Plus</Button>
    //     </Space>
    //   ),
    // },
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

  const handleEdit = (data) => {
    console.log("Edit: ", data);
    // Logique pour modifier le poste
  };

  const handleDelete = (data) => {
    console.log("Delete: ", data);
    // Logique pour supprimer le poste
  };

  const handleViewMore = (data) => {
    console.log("View More: ", data);
    // Logique pour voir plus de détails sur le poste
  };

  const handleRowClick = (event) => {
    const { id, label, leader,description , datePosted, Number_of_Employee } = event.data;
    navigate(`/home/company/CreatePosts?id_p=${id}&label=${label}&leader=${leader}&description=${description}&Number_of_Employee=${Number_of_Employee}`);
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
            Nouveau poste
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

      <Modal
        title="Créer un Nouveau Poste"
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
        <Form {...formItemLayout} style={{ maxWidth: 600 }} initialValues={{ Number_of_Employee: 0 }}>
          <Form.Item label="Label" name="label" rules={[{ required: true, message: 'Champs vide!' }]}>
            <Input placeholder="Nom du poste" />
          </Form.Item>

          <Form.Item label="Responsable" name="responsable" rules={[{ required: true, message: 'Champs vide!' }]}>
            <Input placeholder="Nom du responsable" />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description_post"
            rules={[{ required: true, message: 'Champs vide!' }]}
          >
            <Input.TextArea placeholder="Description du poste" />
          </Form.Item>

          <Form.Item
            name="status"
            label="Statut"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              placeholder="Sélectionnez une option"
              onChange={onStatusChange}
              allowClear
            >
              <Option value="Disponible">Disponible</Option>
              <Option value="Indisponible">Indisponible</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Nombre" name="Number_of_Employee" rules={[{ required: true, message: 'Champs vide!' }]}>
            <InputNumber />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
