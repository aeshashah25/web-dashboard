import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './Addmember.css'; // Import the CSS file

const AddMember = ({ organizations, addMember }) => {
  const [image, setImage] = useState(null); // State to store the uploaded image
  const [successMessage, setSuccessMessage] = useState('');

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Create an object URL for the image
      setImage(imageUrl); // Store the image URL
    }
  };

  const formik = useFormik({
    initialValues: {
      orgId: '',
      teamId: '',
      memberId: '',
      memberName: '',
    },
    validationSchema: Yup.object({
      orgId: Yup.string().required('Organization is required'),
      teamId: Yup.string().required('Team is required'),
      memberId: Yup.string().required('Member ID is required'),
      memberName: Yup.string().required('Member name is required'),
    }),
    onSubmit: (values) => {
      addMember(
        parseInt(values.orgId),
        parseInt(values.teamId),
        values.memberName,
        values.memberId,
        image // Pass the image URL along with the member data
      );
      formik.resetForm();
      setSuccessMessage('Member added successfully!');
      setImage(null); // Reset the image after submission
    },
  });

  return (
    <div className="page">
      <h2>Add Member</h2>
      <form onSubmit={formik.handleSubmit}>
        <select
          {...formik.getFieldProps('orgId')}
          className={formik.touched.orgId && formik.errors.orgId ? 'error' : ''}
        >
          <option value="">Select Organization</option>
          {organizations.map((org) => (
            <option key={org.id} value={org.id}>{org.name}</option>
          ))}
        </select>
        {formik.touched.orgId && formik.errors.orgId && (
          <div className="error-message">{formik.errors.orgId}</div>
        )}

        <select
          {...formik.getFieldProps('teamId')}
          className={formik.touched.teamId && formik.errors.teamId ? 'error' : ''}
        >
          <option value="">Select Team</option>
          {formik.values.orgId &&
            organizations.find((org) => org.id === parseInt(formik.values.orgId))?.teams.map((team) => (
              <option key={team.id} value={team.id}>{team.name}</option>
            ))}
        </select>
        {formik.touched.teamId && formik.errors.teamId && (
          <div className="error-message">{formik.errors.teamId}</div>
        )}

        <input
          type="text"
          placeholder="Member ID"
          {...formik.getFieldProps('memberId')}
          className={formik.touched.memberId && formik.errors.memberId ? 'error' : ''}
        />
        {formik.touched.memberId && formik.errors.memberId && (
          <div className="error-message">{formik.errors.memberId}</div>
        )}

        <input
          type="text"
          placeholder="Member Name"
          {...formik.getFieldProps('memberName')}
          className={formik.touched.memberName && formik.errors.memberName ? 'error' : ''}
        />
        {formik.touched.memberName && formik.errors.memberName && (
          <div className="error-message">{formik.errors.memberName}</div>
        )}

        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className={formik.touched.memberId && formik.errors.memberId ? 'error' : ''}
        />
        {image && <img src={image} alt="Uploaded" className="uploaded-image" />}

        <button type="submit">Add Member</button>
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

export default AddMember;
