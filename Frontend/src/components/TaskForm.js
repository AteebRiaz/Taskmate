// importing libraries
import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const TaskForm = ({ addTask, editingTask, setEditingTask }) => {
  const formik = useFormik({
    initialValues: {
      title: editingTask ? editingTask.title : '',
      description: editingTask ? editingTask.description : '',
      priority: editingTask ? editingTask.priority : 'medium',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      description: Yup.string(),
    }),
    onSubmit: (values, { resetForm }) => {
      if (editingTask) {
        addTask({ ...values, priority: values.priority || 'medium' }, editingTask._id);
        setEditingTask(null);
      } else {
        addTask(values);
      }
      resetForm();
    },
  });
// Update form fields when editingTask changes
  useEffect(() => {
    formik.setValues({
      title: editingTask ? editingTask.title : '',
      description: editingTask ? editingTask.description : '',
      priority: editingTask ? editingTask.priority : 'medium',
    });
  }, [editingTask]);

  return (
    <form onSubmit={formik.handleSubmit} className="mb-3">
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title:
        </label>
        <input
          id="title"
          type="text"
          {...formik.getFieldProps('title')}
          className="form-control"
        />
        {formik.touched.title && formik.errors.title ? (
          <div className="text-danger">{formik.errors.title}</div>
        ) : null}
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description:
        </label>
        <textarea
          id="description"
          {...formik.getFieldProps('description')}
          className="form-control"
        />
        {formik.touched.description && formik.errors.description ? (
          <div className="text-danger">{formik.errors.description}</div>
        ) : null}
      </div>
      <div className="mb-3">
        <label htmlFor="priority" className="form-label">
          Priority:
        </label>
        <select id="priority" {...formik.getFieldProps('priority')} className="form-select">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <div className="mb-3">
        <button type="submit" className="btn btn-primary">
          {editingTask ? 'Update Task' : 'Add Task'}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
