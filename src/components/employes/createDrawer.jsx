/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import {
  Drawer,
  Upload,
  message,
  Input,
  DatePicker,
  Select,
  Radio,
} from "antd";
import { useState } from "react";
import ImgCrop from "antd-img-crop";
import { CiCircleAlert } from "react-icons/ci";
import NumericInput from "../ui/NumericInput";
import { MdBoy } from "react-icons/md";
import { MdOutlineGirl } from "react-icons/md";

const beforeUpload = (file) => {
  const isJpgOrPng =
    file.type === "image/jpeg" ||
    file.type === "image/png" ||
    file.type === "image/jpg" ||
    file.type === "image/svg";
  if (!isJpgOrPng) {
    message.error("Vous ne pouvez télécharger que des fichiers JPG/PNG/SVG!");
    return Upload.LIST_IGNORE;
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error(
      "Vous ne pouvez télécharger des fichiers que de moins de 2 Mo!"
    );
    return Upload.LIST_IGNORE;
  }
  return false;
};

export default function CreateEmployeDrawer({ open, onClose }) {
  const [fileList, setFileList] = useState([]);
  const [childrenDrawer, setChildrenDrawer] = useState(false);

  const onChange = ({ fileList: newFileList }) => {
    if (newFileList.length > 1) {
      newFileList = [newFileList[newFileList.length - 1]];
      message.error("Vous ne pouvez télécharger qu'une seule image.");
    }
    setFileList(newFileList);
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const showChildrenDrawer = () => {
    setChildrenDrawer(true);
  };

  const onChildrenDrawerClose = () => {
    setChildrenDrawer(false);
  };

  const handleCreate = async () => {
    setChildrenDrawer(false);
    onClose();
  };
  return (
    <Drawer
      width={520}
      onClose={onClose}
      closable={true}
      open={open}
      style={{
        borderTopLeftRadius: "1.5rem",
        borderBottomLeftRadius: "1.5rem",
      }}
      title={
        <div>
          <h1 className="text-2xl ">Créer un employé</h1>
        </div>
      }
      extra={
        <div className="bg-[#ecf1fd] py-1 px-2 rounded-lg flex space-x-2">
          <p className="font-thin">Etape</p>
          <div className="flex">
            <p className="font-normal">1</p>
            <p className="font-thin">/2</p>
          </div>
        </div>
      }
      footer={
        <div className="flex  items-center space-x-3 my-3">
          <button
            className="flex  px-4 py-1 justify-between rounded-full bg-[#ecf1fd] text-lg font-light"
            onClick={onClose}
          >
            Annuler
          </button>
          <button
            className="flex  px-4 py-1 justify-between rounded-full bg-[#E89D85] text-lg font-light"
            type="primary"
            onClick={showChildrenDrawer}
          >
            Suivant
          </button>
        </div>
      }
    >
      <div>
        <p className="text-xl font-light text-[#E87868]">
          Renseignements personnels
        </p>
      </div>

      <div className="flex justify-start items-center gap-1 py-2  px-2 rounded-lg my-4 bg-[#ecf1fd]">
        <CiCircleAlert size={18} />
        <p className="text-sm font-thin">
          Veuillez spécifier le prénom et le nom
        </p>
      </div>

      <div className="space-y-3">
        <div className="flex items-end space-x-10">
          <ImgCrop rotationSlider aspectSliderar>
            <Upload
              listType="picture-circle"
              name="avatar"
              className="avatar-uploader font-thin"
              fileList={fileList}
              onChange={onChange}
              onPreview={onPreview}
              maxCount={1}
              beforeUpload={beforeUpload}
            >
              {fileList.length === 0 && "+ Logo"}
            </Upload>
          </ImgCrop>
          <div className="mb-4 flex">
          <Radio.Group onChange={onChange} >

      
            <Radio value={1}>
              <div className="flex-row items-center justify-center align-middle">
                <MdBoy size={24} />
                <p>Homme</p>
              </div>
            </Radio>
            <Radio value={2}>
              <div className="flex-row items-center justify-center align-middle">
                <MdOutlineGirl size={24} />
                <p>Femme</p>
              </div>
            </Radio>
            </Radio.Group>
          </div>
        </div>

        <div className="flex  space-x-2">
          <div className="border w-full py-2 rounded-xl">
            <Input
              placeholder="Nom"
              variant="borderless"
              className="font-thin"
            />
          </div>
          <div className="border w-full py-2 rounded-xl">
            <Input
              placeholder="Prénoms"
              variant="borderless"
              className="font-thin"
            />
          </div>
        </div>

        <div className="w-full border py-2 rounded-xl">
          <DatePicker
            onChange={onChange}
            variant="borderless"
            className="font-thin w-full"
            placeholder="Date de naissance" 
          />
        </div>
        <div className="w-full border py-2 rounded-xl">
          <Input
            variant="borderless"
            className="font-thin"
            placeholder="Lieu de naissance"
          />
        </div>
      </div>

      <div className="mt-4 mb-2">
        <p className="text-xl font-light text-[#E87868]">Coordonnées</p>
      </div>

      <div className="space-y-3">
        <div className="w-full border py-2 rounded-xl">
          <Input
    placeholder="Adresse email"
            variant="borderless"
            className="font-thin"
          />
        </div>
        <div className="w-full border py-2 rounded-xl">
          <Input
            placeholder="Numéro de téléphone"
            variant="borderless"
            className="font-thin"
          />
        </div>
        <div className="w-full border py-2 rounded-xl">
          <Input
        placeholder="Lieu de résidence"
            variant="borderless"
            className="font-thin"
          />
        </div>
      </div>

      <div className="mt-4 mb-2">
        <p className="text-xl font-light text-[#E87868]">
          Informations sur le salarié
        </p>
      </div>

      <div className="flex justify-start items-center space-x-3 gap-1 py-2  px-2 rounded-lg my-4 bg-[#ecf1fd]">
        <CiCircleAlert size={42} />
        <p className="font-thin">
          Le numéro d'employé est une séquence unique de chiffres et/ou de
          lettres qui identifie la personne de manière unique au sein de
          l'entreprise
        </p>
      </div>

      <div className="space-y-3">
        <div className="w-full border py-2 rounded-xl">
          <Input
            placeholder="Matricule"
            variant="borderless"
            className="font-thin"
          />
        </div>
        <div className="w-full border py-2 rounded-xl">
          <DatePicker
            onChange={onChange}
            variant="borderless"
            className="font-thin w-full"
            placeholder="Date d'embauche"
          />
        </div>
        <div className="w-full border py-2 rounded-xl">
          <Input.TextArea
            rows={3}
            placeholder="Ajouter une note"
            variant="borderless"
            className="font-thin"
          />
        </div>
      </div>

      <Drawer
        title={
          <div>
            <h1 className="text-2xl ">Créer un employé</h1>
          </div>
        }
        extra={
          <div className="bg-[#ecf1fd] py-1 px-2 rounded-lg flex space-x-2">
            <p className="font-thin">Etape</p>
            <div className="flex">
              <p className="font-normal">2</p>
              <p className="font-thin">/2</p>
            </div>
          </div>
        }
        footer={
          <div className="flex  items-center space-x-3 my-3">
            <button
              className="flex  px-4 py-1 justify-between rounded-full bg-[#ecf1fd] text-lg font-light"
              onClick={() => {
                setChildrenDrawer(false);
              }}
            >
              Annuler
            </button>
            <button
              className="flex  px-4 py-1 justify-between rounded-full bg-[#E89D85] text-lg font-light"
              type="primary"
              onClick={handleCreate}
            >
              Suivant
            </button>
          </div>
        }
        width={500}
        closable={false}
        onClose={onChildrenDrawerClose}
        open={childrenDrawer}
      >
        <div className="mt-4 mb-2">
          <p className="text-xl font-light text-[#E87868]">Département</p>
        </div>

        <div className="w-full border py-2 rounded-xl">
          <Select
            variant="borderless"
            className="font-thin w-full"
            showSearch
            placeholder="Selectionnez un département"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={[
              {
                value: "1",
                label: "Jack",
              },
              {
                value: "2",
                label: "Lucy",
              },
              {
                value: "3",
                label: "Tom",
              },
            ]}
          />
        </div>
        <div className="mt-4 mb-2">
          <p className="text-xl font-light text-[#E87868]">Positions</p>
        </div>

        <div className="w-full border py-2 rounded-xl">
          <Select
            variant="borderless"
            className="font-thin w-full"
            showSearch
            placeholder="Selectionnez un poste"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={[
              {
                value: "1",
                label: "Jack",
              },
              {
                value: "2",
                label: "Lucy",
              },
              {
                value: "3",
                label: "Tom",
              },
            ]}
          />
        </div>

        <div className="mt-4 mb-2">
          <p className="text-xl font-light text-[#E87868]">Contrat</p>
        </div>

        <div className="space-y-3">
          <div className="w-full border py-2 rounded-xl">
            <Select
              variant="borderless"
              className="font-thin w-full"
              showSearch
              placeholder="Selectionnez un type de contrat"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={[
                {
                  value: "1",
                  label: "Jack",
                },
                {
                  value: "2",
                  label: "Lucy",
                },
                {
                  value: "3",
                  label: "Tom",
                },
              ]}
            />
          </div>
          <div className="border w-full py-2 rounded-xl">
            <NumericInput />
          </div>
        </div>

        <div className="mt-4 mb-2">
          <p className="text-xl font-light text-[#E87868]">En cas d'urgence</p>
        </div>

        <div className="space-y-3">
          <div className="flex  space-x-2">
            <div className="border w-full py-2 rounded-xl">
              <Input
                placeholder="Nom"
                variant="borderless"
                className="font-thin"
              />
            </div>
            <div className="border w-full py-2 rounded-xl">
              <Input
                placeholder="Prénoms"
                variant="borderless"
                className="font-thin"
              />
            </div>
          </div>
          <div className="border w-full py-2 rounded-xl">
            <Input
              placeholder="Basic usage"
              variant="borderless"
              className="font-thin"
            />
          </div>
          <div className="border w-full py-2 rounded-xl">
            <Input
              placeholder="Aderess email"
              variant="borderless"
              className="font-thin"
            />
          </div>
          <div className="border w-full py-2 rounded-xl">
            <Input
              placeholder="Numéro de téléphone"
              variant="borderless"
              className="font-thin"
            />
          </div>
        </div>
      </Drawer>
    </Drawer>
  );
}
