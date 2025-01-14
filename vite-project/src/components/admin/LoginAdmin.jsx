import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { axiosClient } from '../../api/axios';

const LoginAdmin = () => {
    const initialValues = {
        email: '',
        password: ''
    };

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email format').required('Required'),
        password: Yup.string().required('Required')
    });

    const onSubmit = async values => {
        await axiosClient.get("/sanctum/csrf-cookie")
        const data=await axiosClient.post("/login",values)
        console.log(data);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
                <h2 className="text-2xl font-bold text-center">Admin Login</h2>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    <Form className="space-y-6">
                        <div className="space-y-1">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <Field type="email" id="email" name="email" className="w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-indigo-200" />
                            <ErrorMessage name="email" component="div" className="text-sm text-red-600" />
                        </div>
                        <div className="space-y-1">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <Field type="password" id="password" name="password" className="w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-indigo-200" />
                            <ErrorMessage name="password" component="div" className="text-sm text-red-600" />
                        </div>
                        <button type="submit" className="w-full px-4 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200">Login</button>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default LoginAdmin;