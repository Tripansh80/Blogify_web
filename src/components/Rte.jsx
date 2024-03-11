



import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';

const Rte = ({ name, control, label, defaultValue = '' }) => {
  return (
    <div className='w-full'>
      {label && <label className='inline-block mb-1 pl-1'>{label}</label>}
      <Controller
        name={name || 'content'}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            apiKey='fpqoqk3v8amvf2cxftuxjjg6cwsp5i0ezz77he9hh16qhmu6'
            initialValue={defaultValue}
            init={{
              height: 500,
              menubar: true,
              plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount'
              ],
              toolbar:
                'undo redo | formatselect | bold italic backcolor | \
                alignleft aligncenter alignright alignjustify | \
                bullist numlist outdent indent | removeformat | help'
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
};

export default Rte;

