import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const AddOrganization = ({ addOrganization }) => {
  const [successMessage, setSuccessMessage] = useState('');

  const formik = useFormik({
    initialValues: {
      orgName: '',
      orgEmail: '',
      orgLocation: '',
    },
    validationSchema: Yup.object({
      orgName: Yup.string().required('Organization name is required'),
      orgEmail: Yup.string().email('Invalid email format').required('Email is required'),
      orgLocation: Yup.string().required('Location is required'),
    }),
    onSubmit: (values) => {
      addOrganization(values.orgName, values.orgEmail, values.orgLocation);
      formik.resetForm();
      setSuccessMessage('Organization added successfully!');
    },
  });

  return (
    <div className="page">
      <h2>Add Organization</h2>
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          {...formik.getFieldProps('orgName')}
        />
        {formik.touched.orgName && formik.errors.orgName ? <div>{formik.errors.orgName}</div> : null}

        <input
          type="email"
          placeholder="Email"
          {...formik.getFieldProps('orgEmail')}
        />
        {formik.touched.orgEmail && formik.errors.orgEmail ? <div>{formik.errors.orgEmail}</div> : null}

        <input
          type="text"
          placeholder="Location"
          {...formik.getFieldProps('orgLocation')}
        />
        {formik.touched.orgLocation && formik.errors.orgLocation ? <div>{formik.errors.orgLocation}</div> : null}

        <button type="submit">Add Organization</button>
      </form>
      {successMessage && (
        <div className="success-message">
          {successMessage} <Link to="/hierarchy">View Hierarchy</Link>
        </div>
      )}
    </div>
  );
};

export default AddOrganization;