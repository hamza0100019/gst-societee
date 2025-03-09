import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { axiosClient } from '../../api/axios';
import { toast } from 'react-hot-toast';

const LoginAdmin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const initialValues = {
        email: '',
        password: ''
    };

    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Format de l\'email invalide')
            .required('L\'email est requis'),
        password: Yup.string()
            .min(6, 'Le mot de passe doit contenir au moins 6 caractères')
            .required('Le mot de passe est requis')
    });
   
     
    const onSubmit = async (values) => {
        setIsLoading(true);
    
        try {
            await axiosClient.get('/sanctum/csrf-cookie');
        
            // Ensuite faire le login
            const response = await axiosClient.post('/login', values);
            localStorage.setItem("auth_token", response.data.token);
            toast.success("Connexion réussie");

            setTimeout(() => {
                navigate('/dashboard');
            }, 1000);
        } catch (error) {
            toast.error("Email ou mot de passe invalide. Veuillez réessayer.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <style>
                {`
                    @keyframes shake {
                        0%, 100% { transform: translateX(0); }
                        25% { transform: translateX(-5px); }
                        50% { transform: translateX(5px); }
                        75% { transform: translateX(-5px); }
                    }
                    .shake {
                        animation: shake 0.3s ease-in-out;
                    }
                `}
            </style>
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">
                    Connexion
                </h2>

                {/* Messages d'alerte */}
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {({ errors, touched }) => (
                        <Form className="space-y-8">
                            {/* Champ Email */}
                            <div className="relative">
                                <Field
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Entrez votre email"
                                    className={`peer block w-full px-4 py-3 bg-transparent border-b-2 focus:ring-0 focus:outline-none ${
                                        errors.email && touched.email
                                            ? 'border-red-500'
                                            : 'border-gray-300'
                                    }`}
                                    autoComplete="off"
                                />
                                <label
                                    htmlFor="email"
                                    className={`absolute left-4 text-sm text-gray-400 transition-all opacity-0 peer-placeholder-shown:opacity-0 peer-placeholder-shown:top-3 peer-focus:opacity-100 peer-focus:top-[-10px] peer-focus:text-blue-600`}
                                >
                                    Email
                                </label>
                                <span
                                    className={`absolute right-3 top-3 text-lg transition-all ${
                                        (errors.email && touched.email)
                                            ? 'text-red-500 shake'
                                            : 'text-gray-400'
                                    }`}
                                >
                                    <i className="fas fa-envelope"></i>
                                </span>
                                <ErrorMessage
                                    name="email"
                                    component="div"
                                    className="text-sm text-red-600 mt-1"
                                />
                            </div>

                            {/* Champ Mot de passe */}
                            <div className="relative">
                                <Field
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Entrez votre mot de passe"
                                    className={`peer block w-full px-4 py-3 bg-transparent border-b-2 focus:ring-0 focus:outline-none ${
                                        errors.password && touched.password
                                            ? 'border-red-500'
                                            : 'border-gray-300'
                                    }`}
                                    autoComplete="off"
                                />
                                <label
                                    htmlFor="password"
                                    className={`absolute left-4 text-sm text-gray-400 transition-all opacity-0 peer-placeholder-shown:opacity-0 peer-placeholder-shown:top-3 peer-focus:opacity-100 peer-focus:top-[-10px] peer-focus:text-blue-600`}
                                >
                                    Mot de passe
                                </label>
                                <span
                                    className={`absolute right-3 top-3 text-lg transition-all ${
                                        (errors.password && touched.password)
                                            ? 'text-red-500 shake'
                                            : 'text-gray-400'
                                    }`}
                                >
                                    <i className="fas fa-lock"></i>
                                </span>
                                <ErrorMessage
                                    name="password"
                                    component="div"
                                    className="text-sm text-red-600 mt-1"
                                />
                            </div>

                            {/* Bouton de soumission */}
                            <button
                                type="submit"
                                className={`w-full py-3 text-white bg-blue-600 rounded-full font-medium text-lg transition-transform duration-500 transform hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    isLoading ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Connexion...' : 'Se connecter'}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default LoginAdmin;
