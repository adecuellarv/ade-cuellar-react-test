import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import Swal from 'sweetalert2';
import { Product } from '../../../models';
import UploadFile from './upload-file/UploadFile';
import { getCategories } from '../../../api/restCategories';
import { postProduct, putProduct } from '../../../api/restProducts';
import './styles.scss';

interface FormProps {
  infoProduct: Product;
}

const Form: React.FC<FormProps> = ({ infoProduct }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState<any>(null);
  const [image, setImage] = useState('')
  const [categories, setCategories] = useState([]);

  const save = async () => {
    if (title && price && image && category) {
      const values = {
        title,
        price,
        description: 'lorem ipsum set',
        image,
        category: category.name
      }
      const resp = await putProduct(infoProduct.id, values);
      if(resp) navigate('/products');
    }else{
      Swal.fire({
        title: 'Campos faltantes',
        text: '',
        icon: 'error',
        confirmButtonText: '¡Entendido!'
      })
    }
  }

  useEffect(() => {
    if (categories?.length && infoProduct?.title) {
      const position = categories.findIndex((i: any) => i.name === infoProduct?.category);
      if (position !== -1) setCategory(categories[position])
    }
  }, [categories]);

  useEffect(() => {
    if (infoProduct?.title) {
      setTitle(infoProduct?.title);
      setPrice(infoProduct.price)
      setImage(infoProduct.image);
    }
  }, []);

  useEffect(() => {
    const getCategoriesFunc = async () => {
      const resp = await getCategories();
      if (resp?.data) {
        const newArray: any = [];
        resp?.data?.map((item: any) => {
          const newObjt = {
            name: item,
            code: item
          }
          newArray.push(newObjt);
        })
        setCategories(newArray);
      }
    }
    getCategoriesFunc();
  }, []);

  return (
    <>
      <div className='div-form'>
        <h3>Formulario</h3>
        <div className='form-components'>
          <div className='two-colums'>
            <div className='container-input'>
              <label>Nombre</label>
              <InputText value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className='container-input'>
              <label>Precio</label>
              <InputText value={price} onChange={(e) => setPrice(e.target.value)} type='number' />
            </div>
          </div>
          <div className='two-colums'>

            <div className='container-input'>
              <label>Imagen</label>
              <div className='two-colums'>
                <div>
                  <UploadFile />
                </div>
              </div>
            </div>
            <div className='container-input'>
              <label>Categoría</label>
              <div>
                <Dropdown value={category} onChange={(e) => setCategory(e.value)} options={categories} optionLabel="name"
                  placeholder="Selecciona Categoría" className="w-full" />
              </div>
            </div>
          </div>
          <div className='container-input' style={{ textAlign: 'right' }}>
            <Button onClick={save}>Enviar</Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Form;