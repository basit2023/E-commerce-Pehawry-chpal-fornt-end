import React, { useState, useEffect } from 'react';
import AdminMenu from '../../AdminMenu/AdminMenu';
import axios from 'axios';
import toast from 'react-hot-toast';
import CategoryForm from '../../Form/CategoryForm';
import {Modal} from 'antd'
import apiService from '../../../utils/apiService';
const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);    //to show the popup from antd
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");   //for updating name 
//create new category items

  //handle Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await apiService.post("/catagory/create", {
        name,
      });
      if (data?.success) {
        toast.success(`${name} is created`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      // toast.error("somthing went wrong in input form");
    }
  };


//get all items of category
  const getAllCategory = async () => {
    try {
      const { data } = await apiService.get('/catagory/get-all');
      console.log('the category is:', data.category);
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong in getting category');
    }
  };

  useEffect(() => {
    getAllCategory(); 
  }, []);
  //update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await apiService.put(
        `/catagory/update/${selected._id}`,
        { name: updatedName }
      );
      if (data?.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //delete category
  const handleDelete = async (pId) => {
    try {
      const { data } = await apiService.delete(
        `/catagory/delete/${pId}`
      );
      if (data.success) {
        toast.success(`category is deleted`);

        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Somtihing went wrong");
    }
  };

  return (
    <div title="Dashboard - Create Category">
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-1 md:col-span-1">
            <AdminMenu />
          </div>
          <div className="col-span-1 md:col-span-2">
            <h1 className="text-2xl font-bold mb-4">Manage Category</h1>
            <div className="p-3 w-1/2">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            
            <div className="w-3/4">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((cate) => (
                    <tr key={cate._id}>
                      <td>{cate.name}</td>
                      <td>
                      <button
                        className="bg-blue-500 gap-3 py-2 rounded-lg px-3 ms-2"
                        onClick={() => {
                          setVisible(true);
                          setUpdatedName(cate.name);
                          setSelected(cate);
                        }}
                      >
                        Edit
                      </button>
                        <button
                          className="bg-red-500 py-2 rounded-lg px-3 ms-2"
                          onClick={() => {
                            handleDelete(cate._id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal onCancel={() => setVisible(false)} footer={null} visible={visible}>
              <CategoryForm
                value={updatedName}
                setValue={setUpdatedName}
                handleSubmit={handleUpdate}
              />
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;
