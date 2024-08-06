import { useLocation, useNavigate,useParams } from 'react-router-dom';
import { useState } from "react";

import { Button, Modal, Form, Input, InputNumber, Select, Space } from "antd";


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

export default function CreateDep() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const query = new URLSearchParams(search);

  const id_dep = query.get('id_dep');
  const label = query.get('label');
  const leader = query.get('leader');
  const des_dep = query.get('des_dep');
  const number_of_post = query.get('number_of_post');

  const handleEdit = () => {
    // Logique pour modifier le département
    console.log("Modifier département:", id_dep);
  };

  const handleDelete = () => {
    // Logique pour supprimer le département
    console.log("Supprimer département:", id_dep);
  };

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


    <div className="flex flex-col items-center bg-gray-100 p-5">
      <h1 className="text-2xl font-bold mb-5 text-gray-800">Information du Département</h1>
      <table className="min-w-full bg-white">
        <tbody>
          <tr className="w-full border-b">
            <td className="py-4 px-6 text-lg font-bold text-gray-600 break-words border">Id</td>
            <td className="py-4 px-6 text-lg text-gray-600 break-words border">{id_dep}</td>
          </tr>
          <tr className="w-full border-b">
            <td className="py-4 px-6 text-lg font-bold text-gray-600 break-words border">Label</td>
            <td className="py-4 px-6 text-lg text-gray-600 break-words border">{label}</td>
          </tr>
          <tr className="w-full border-b">
            <td className="py-4 px-6 text-lg font-bold text-gray-600 break-words border">Leader</td>
            <td className="py-4 px-6 text-lg text-gray-600 break-words border">{leader}</td>
          </tr>
          <tr className="w-full border-b">
            <td className="py-4 px-6 text-lg font-bold text-gray-600 break-words border">Nombre de Départements</td>
            <td className="py-4 px-6 text-lg text-gray-600 break-words border">{number_of_post}</td>
          </tr>
        </tbody>
      </table>

      <div className="min-w-full bg-white border">
        <h1 className="uppercase font-bold text-center m-5">Description</h1>
        <div className="m-8 overflow-auto max-h-40">
          {des_dep}
        </div>
      </div>

      <div className="mt-5 flex justify-between w-full">
        <button 
          onClick={() => navigate("/home/company/departments")}
          className="bg-orange-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Retour
        </button>
        <div className="flex space-x-3">
          <button 
            // onClick={handleEdit} 
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Voir Membre
          </button>
          <button 
        onClick={showModal}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"

          >
            Modifier
          </button>
          <button 
            onClick={handleDelete} 
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Supprimer
          </button>
        </div>
      </div>


      <Modal
        title="Modifier département"
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
}
