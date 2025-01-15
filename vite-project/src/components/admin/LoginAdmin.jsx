import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { axiosClient } from '../../api/axios';

const LoginAdmin = () => {
    const [alertMessage, setAlertMessage] = useState(null); // Pour les messages d'alerte
    const [alertType, setAlertType] = useState(null); // Type d'alerte: 'success' ou 'error'
    const [isLoading, setIsLoading] = useState(false); // Pour afficher le chargement
    const navigate = useNavigate(); // Pour naviguer vers une autre page

    const initialValues = {
        email: '',
        password: ''
    };

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email format').required('Email is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
    });

    const onSubmit = async (values, { setSubmitting }) => {
        setIsLoading(true);
        try {
            await axiosClient.get('/sanctum/csrf-cookie');
            const response = await axiosClient.post('/login', values);
    
            localStorage.setItem("auth_token", response.data.token); // Stocke le token
            setAlertMessage('Login successful');
            setAlertType('success');
            
            // Redirige vers le dashboard
            setTimeout(() => {
                navigate('/dashboard');
            }, 1000);
        } catch (error) {
            setAlertMessage('Invalid email or password. Please try again.');
            setAlertType('error');
        } finally {
            setSubmitting(false);
            setIsLoading(false);
        }
    };
    

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 to-purple-500">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-center text-gray-800">Admin Login</h2>

                {/* Alert messages */}
                {alertMessage && (
                    <div
                        className={`p-4 rounded ${
                            alertType === 'success'
                                ? 'bg-green-100 text-green-800 border-green-300'
                                : 'bg-red-100 text-red-800 border-red-300'
                        } border`}
                    >
                        {alertMessage}
                    </div>
                )}

                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    {({ errors, touched }) => (
                        <Form className="space-y-6">
                            <div className="space-y-1">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <Field
                                    type="email"
                                    id="email"
                                    name="email"
                                    className={`w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:ring-indigo-300 ${
                                        errors.email && touched.email
                                            ? 'border-red-500'
                                            : 'border-gray-300'
                                    }`}
                                />
                                <ErrorMessage
                                    name="email"
                                    component="div"
                                    className="text-sm text-red-600"
                                />
                            </div>

                            <div className="space-y-1">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <Field
                                    type="password"
                                    id="password"
                                    name="password"
                                    className={`w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:ring-indigo-300 ${
                                        errors.password && touched.password
                                            ? 'border-red-500'
                                            : 'border-gray-300'
                                    }`}
                                />
                                <ErrorMessage
                                    name="password"
                                    component="div"
                                    className="text-sm text-red-600"
                                />
                            </div>

                            <button
                                type="submit"
                                className={`w-full px-4 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-300 transition duration-200 ${
                                    isLoading ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Logging in...' : 'Login'}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default LoginAdmin;
