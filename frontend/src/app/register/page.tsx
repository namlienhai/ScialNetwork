'use client'

import React, { useState } from 'react';

const RegisterPage: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [touched, setTouched] = useState({
    fullName: false,
    username: false,
    phoneNumber: false,
    email: false,
    password: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !username || !phoneNumber || !email || !password) {
      // Mark all fields as touched to show errors
      setTouched({
        fullName: true,
        username: true,
        phoneNumber: true,
        email: true,
        password: true
      });
      return;
    }
    // Handle registration logic here
    console.log({ fullName, username, phoneNumber, email, password });
  };

  const handleBlur = (field: keyof typeof touched) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const getErrorMessage = (field: string, value: string) => {
    if (!touched[field as keyof typeof touched]) return '';
    if (!value) return 'Trường này là bắt buộc';
    if (field === 'email' && !/\S+@\S+\.\S+/.test(value)) {
      return 'Email không hợp lệ';
    }
    if (field === 'phoneNumber' && !/^\d{10,11}$/.test(value)) {
      return 'Số điện thoại phải có 10-11 chữ số';
    }
    if (field === 'password' && value.length < 6) {
      return 'Mật khẩu phải có ít nhất 6 ký tự';
    }
    return '';
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
          Đăng ký
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit} noValidate>
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                Họ và tên <span className="text-red-500">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  required
                  className={`block w-full rounded-md border ${
                    getErrorMessage('fullName', fullName) ? 'border-red-500' : 'border-gray-300'
                  } px-3 py-2 focus:border-black focus:outline-none focus:ring-1 focus:ring-black`}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  onBlur={() => handleBlur('fullName')}
                />
                {getErrorMessage('fullName', fullName) && (
                  <p className="mt-1 text-sm text-red-500">{getErrorMessage('fullName', fullName)}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Tên đăng nhập <span className="text-red-500">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className={`block w-full rounded-md border ${
                    getErrorMessage('username', username) ? 'border-red-500' : 'border-gray-300'
                  } px-3 py-2 focus:border-black focus:outline-none focus:ring-1 focus:ring-black`}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onBlur={() => handleBlur('username')}
                />
                {getErrorMessage('username', username) && (
                  <p className="mt-1 text-sm text-red-500">{getErrorMessage('username', username)}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                Số điện thoại <span className="text-red-500">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  autoComplete="tel"
                  required
                  className={`block w-full rounded-md border ${
                    getErrorMessage('phoneNumber', phoneNumber) ? 'border-red-500' : 'border-gray-300'
                  } px-3 py-2 focus:border-black focus:outline-none focus:ring-1 focus:ring-black`}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  onBlur={() => handleBlur('phoneNumber')}
                />
                {getErrorMessage('phoneNumber', phoneNumber) && (
                  <p className="mt-1 text-sm text-red-500">{getErrorMessage('phoneNumber', phoneNumber)}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email <span className="text-red-500">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={`block w-full rounded-md border ${
                    getErrorMessage('email', email) ? 'border-red-500' : 'border-gray-300'
                  } px-3 py-2 focus:border-black focus:outline-none focus:ring-1 focus:ring-black`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => handleBlur('email')}
                />
                {getErrorMessage('email', email) && (
                  <p className="mt-1 text-sm text-red-500">{getErrorMessage('email', email)}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Mật khẩu <span className="text-red-500">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className={`block w-full rounded-md border ${
                    getErrorMessage('password', password) ? 'border-red-500' : 'border-gray-300'
                  } px-3 py-2 focus:border-black focus:outline-none focus:ring-1 focus:ring-black`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => handleBlur('password')}
                />
                {getErrorMessage('password', password) && (
                  <p className="mt-1 text-sm text-red-500">{getErrorMessage('password', password)}</p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
              >
                Đăng ký
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
