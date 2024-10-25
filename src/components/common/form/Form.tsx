import React, { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Product } from '../../../models';
import UploadFile from './upload-file/UploadFile';
import { getCategories } from '../../../api/restCategories';
import './styles.scss';

interface FormProps {
  infoProduct: Product;
}

const Form: React.FC<FormProps> = ({ infoProduct }) => {
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [image, setImage] = useState('')
  const [categories, setCategories] = useState([]);

  const onUpload = () => {

  }

  useEffect(() => {
    if (infoProduct?.title) {
      setTitle(infoProduct?.title);
      setPrice(infoProduct.price)
      setImage(infoProduct.image);
      setCategory(infoProduct.category);
    }
  }, []); console.log('catego', category)

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
            <Button>Enviar</Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Form;