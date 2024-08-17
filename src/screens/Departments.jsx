/* eslint-disable react/prop-types */
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Modal,
  Form,
  Input,
  Select,
  message,
  Dropdown,
  Space,
} from "antd";
import { createDepartement, deleteDepartement } from "../api/departement";
import useDepartmentStore from "../stores/departement";
import { PiDotsThreeOutlineThin } from "react-icons/pi";

export const Departments = () => {
  const navigate = useNavigate();
  const { departments, loadDepartments } = useDepartmentStore();
  const [form] = Form.useForm();
  const [rowData, setRowData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleDelete = async (id) => {
    try {
      const response = await deleteDepartement(id);
      if (response.data.ok) {
        message.success("Département supprimé avec succès");
        loadDepartments();
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
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            <PiDotsThreeOutlineThin size={24} />
          </Space>
        </a>
      </Dropdown>
    );
  };

  useEffect(() => {
    loadDepartments();
  }, [loadDepartments]);

  useEffect(() => {
    setRowData(departments);
  }, [departments]);

  const [colDefs] = useState([
    { field: "name", headerName: "Label" },
    {
      field: "leader",
      headerName: "Leader",
      valueFormatter: (params) => (params.value ? params.value : "aucun"),
    },
    {
      field: "location",
      headerName: "Localisation",
      valueFormatter: (params) => (params.value ? params.value : "aucune"),
    },
    {
      field: "budget",
      headerName: "Budget",
      valueFormatter: (params) => (params.value ? params.value : "aucun"),
    },
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

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleRowClick = (event) => {
    const { id } = event.data;
    console.log("Row clicked:", id);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      if (values.budget <= 0) {
        message.error("Le budget doit être supérieur à 0");
        return;
      }

      try {
        const response = await createDepartement(
          values.departmentName,
          values.managerName,
          values.location,
          values.budget,
          values.description
        );
        if (response.data.ok) {
          form.resetFields();
          setIsModalVisible(false);
          message.success("Département créé avec succès");
          loadDepartments();
        }
      } catch (error) {
        message.error(`Oops! ${error.message}`);
      }
    } catch (error) {
      console.error("Une erreur est survenue:", error);
    }
  };

  return (
    <div className="mx-5 py-3 ag-theme-quartz">
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
      <div style={{ height: "70vh" }}>
        <AgGridReact
          pagination={true}
          paginationPageSize={500}
          rowData={rowData}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          onRowClicked={handleRowClick}
        />
      </div>

      {/* Modal pour créer un nouveau département */}
      <Modal
        title="Créer un Nouveau département"
        open={isModalVisible}
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
          form={form}
          layout="vertical"
          requiredMark={false}
          className="w-full mx-auto mt-5"
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
        >
          <div className="flex w-full space-x-4 items-center justify-center mx-auto">
            <Form.Item
              label="Nom du département"
              name="departmentName"
              className="w-full"
              rules={[
                {
                  required: true,
                  message: "Veuillez entrer le nom du département!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item label="Manager" name="managerName" className="w-full">
              <Select showSearch placeholder="Sélectionner le manager" />
            </Form.Item>
          </div>
          <Form.Item label="Localisation" name="location">
            <Input />
          </Form.Item>
          <Form.Item label="Budget en F CFA" name="budget">
            <Input />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input.TextArea placeholder="Ajouter une description pour ce département" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
