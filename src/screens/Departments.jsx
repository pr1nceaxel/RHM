import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Modal,
  Form,
  Input,
  Select,
} from "antd";
import { createDepartement } from "../api/departement";

export const Departments = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm(); 

  const [rowData, setRowData] = useState([
    
  ]);

  const [colDefs, setColDefs] = useState([
    { field: "label", headerName: "Label du Département" },
    { field: "leader", headerName: "Responsable" },
    { field: "number_of_post", headerName: "Nombre de post" },
  ]);

  const defaultColDef = {
    flex: 1,
    sortable: true,
    filter: true,
    floatingFilter: true,
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleRowClick = (event) => {
    const { id_dep, label, leader, des_dep, number_of_post } = event.data;
    navigate(
      `/home/company/Departments/CreateDep?id_dep=${id_dep}&label=${label}&leader=${leader}&des_dep=${des_dep}&number_of_post=${number_of_post}`
    );
  };

  const handleSubmit = async () => {
    try {
      
      const values = await form.validateFields();
      console.log("Form values:", values);
      
      const response = await createDepartement(values.departmentName, values.managerName, values.location, parseFloat(values.budget) , values.description);
      console.log("Response:", response);

      // if (response.success) {
      //   message.success("Département créé avec succès !");
        
      //   setRowData([...rowData, response.newDepartment]);
      //   setIsModalVisible(false);
      //   form.resetFields(); 
      // } else {
      //   message.error("Erreur lors de la création du département : " + response.message);
      // }
    } catch (error) {
      console.error("Une erreur est survenue:", error);
    }
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
          pagination={true}
          paginationPageSize={500}
          paginationPageSizeSelector={[200, 500, 1000]}
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

            <Form.Item
              label="Manager"
              name="managerName"
              className="w-full"
            >
              <Select
                showSearch
                placeholder="Sélectionner le manager"
              />
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
