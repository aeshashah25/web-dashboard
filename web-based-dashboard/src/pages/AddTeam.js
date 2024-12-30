import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './Addteam.css'; // Import the CSS file

const AddTeam = ({ organizations, addTeam }) => {
  const [successMessage, setSuccessMessage] = useState('');

  const formik = useFormik({
    initialValues: {
      orgId: '',
      teamName: '',
    },
    validationSchema: Yup.object({
      orgId: Yup.string().required('Organization is required'),
      teamName: Yup.string().required('Team name is required'),
    }),
    onSubmit: (values) => {
      addTeam(parseInt(values.orgId), values.teamName);
      formik.resetForm();
      setSuccessMessage('Team added successfully!');
    },
  });

  return (
    <div className="page">
      <h2>Add Team</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="numbered-fields">
          <div data-number="1">
            <select
              {...formik.getFieldProps('orgId')}
              className={formik.touched.orgId && formik.errors.orgId ? 'error' : ''}
            >
              <option value="">Select Organization</option>
              {organizations.map((org) => (
                <option key={org.id} value={org.id}>
                  {org.name}
                </option>
              ))}
            </select>
            {formik.touched.orgId && formik.errors.orgId && (
              <div className="error-message">{formik.errors.orgId}</div>
            )}
          </div>

          <div data-number="2">
            <input
              type="text"
              placeholder="Team Name"
              {...formik.getFieldProps('teamName')}
              className={formik.touched.teamName && formik.errors.teamName ? 'error' : ''}
            />
            {formik.touched.teamName && formik.errors.teamName && (
              <div className="error-message">{formik.errors.teamName}</div>
            )}
          </div>
        </div>

        <button type="submit">Add Team</button>
      </form>

      {successMessage && (
        <div className="success-message">
          {successMessage}{' '}
          <Link to="/hierarchy">View Hierarchy</Link>
        </div>
      )}
    </div>
  );
};

export default AddTeam;
