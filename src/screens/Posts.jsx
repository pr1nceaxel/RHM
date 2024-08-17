/* eslint-disable react/prop-types */
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  message,
  Dropdown,
  Space,
} from "antd";
import { createPost, deletePost, loadPositions } from "../api/post";
import usePositionStore from "../stores/post";
import { PiDotsThreeOutlineThin } from "react-icons/pi";

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
  const { positions, loadPositions, removePosition } = usePositionStore();

  const [form] = Form.useForm();

  const [rowData, setRowData] = useState([]);

  const handleDelete = async (id) => {
    try {
      const response = await deletePost(id);
      if (response.data.ok) {
        removePosition(id);
        message.success("Post supprimé avec succès");
        loadPositions();
      }
    } catch (error) {
      message.error(`Oops! ${error.message}`);
    }
  };

  const CustomButtonComponent = (props) => {
    const { data } = props;
    const handleMenuClick = (e) => {
      if (e.key === "0") {
        navigate(`/departments/${data.id}`);
      } else if (e.key === "1") {
        navigate(`/departments/${data.id}/edit`);
      } else if (e.key === "2") {
        handleDelete(data.id);
      }
    };

    const items = [
      {
        label: <a href="#">Détail</a>,
        key: "0",
      },
      {
        label: <a href="#">Modifier</a>,
        key: "1",
      },
      {
        type: "divider",
      },
      {
        label: <a href="#">Supprimer</a>,
        danger: true,
        key: "2",
      },
    ];

    return (
      <Dropdown
        menu={{
          items,
          onClick: handleMenuClick,
        }}
        trigger={["click"]}
      >
        <a className="mt-6" onClick={(e) => e.preventDefault()}>
          <Space>
            <PiDotsThreeOutlineThin size={24} />
          </Space>
        </a>
      </Dropdown>
    );
  };

  useEffect(() => {
    loadPositions();
  }, [loadPositions]);

  useEffect(() => {
    setRowData(positions);
  }, [positions]);

  const [colDefs] = useState([
    { field: "title", headerName: "Label du Poste" },
    { field: "department", headerName: "Département" },
    { field: "Number_of_Employee", headerName: "Nombre d'Employés" },
    {
      field: "Action",
      cellRenderer: CustomButtonComponent,
      flex: 0.4,
      filter: false,
    },
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

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const newPost = {
        label: values.label,
        leader: values.responsable,
        description: values.description_post,
        datePosted: new Date().toISOString().split("T")[0], 
        status: values.status,
        Number_of_Employee: values.Number_of_Employee,
      };

      const response = await createPost(newPost);
      setRowData([...rowData, response.data]); 
      setIsModalVisible(false);
      form.resetFields(); 
    } catch (error) {
      console.error("Failed to create post:", error);
    }
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
        />
      </div>

      <Modal
        title="Créer un Nouveau Poste"
        open={isModalVisible}
        onOk={handleSubmit}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Annuler
          </Button>,
          <Button key="submit" type="primary" onClick={handleSubmit}>
            Soumettre
          </Button>,
        ]}
      >
        <Form
          {...formItemLayout}
          form={form}
          style={{ maxWidth: 600 }}
          initialValues={{ Number_of_Employee: 0 }}
        >
          <Form.Item
            label="Label"
            name="label"
            rules={[{ required: true, message: "Champs vide!" }]}
          >
            <Input placeholder="Nom du poste" />
          </Form.Item>

          <Form.Item
            label="Responsable"
            name="responsable"
            rules={[{ required: true, message: "Champs vide!" }]}
          >
            <Input placeholder="Nom du responsable" />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description_post"
            rules={[{ required: true, message: "Champs vide!" }]}
          >
            <Input.TextArea placeholder="Description du poste" />
          </Form.Item>

          <Form.Item name="status" label="Statut" rules={[{ required: true }]}>
            <Select
              placeholder="Sélectionnez une option"
              onChange={() => {}}
              allowClear
            >
              <Option value="Disponible">Disponible</Option>
              <Option value="Indisponible">Indisponible</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Nombre"
            name="Number_of_Employee"
            rules={[{ required: true, message: "Champs vide!" }]}
          >
            <InputNumber />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
