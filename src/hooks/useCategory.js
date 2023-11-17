import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import apiService from "../utils/apiService";
export default function useCategory() {
  const [categories, setCategories] = useState([]);

  //get cat
  const getAllCategory = async () => {
    try {
      const { data } = await apiService.get('/catagory/get-all');
      
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Something went wrong in getting category');
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);
  return categories;
}



