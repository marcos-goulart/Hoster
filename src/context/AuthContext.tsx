import { useState } from 'react'
import type { ReactNode } from 'react'
import { AuthContext } from './AuthContextInstance'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLogged, setIsLogged] = useState(() => {
    return !!localStorage.getItem('token')
  })

  const login = () => {
    localStorage.setItem('token', 'mock-token')
    setIsLogged(true)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setIsLogged(false)
  }

  return <AuthContext.Provider value={{ isLogged, login, logout }}>{children}</AuthContext.Provider>
}

export { AuthContext }
// when with bakend below

// import { createContext, useEffect, useState, ReactNode } from 'react';
// import { AuthContext } from './../../../hotel-react/src/context/AuthContext';

// interface User {
//   id: number;
//   name: string;
//   email: string;
// }

// interface AuthContextType {
//   user: User | null;
//   isLogged: boolean;
//   login: (email: string, password: string) => Promise<void>;
//   logout: () => void;
// }

// export const AuthContext = createContext<AuthContextType>({
//   user: null,
//   isLogged: false,
//   login: async () => {},
//   logout: () => {},
// });

// export function AuthProvider({ children }: { children: ReactNode }) {
//   const [user, setUser] = useState<User | null>(null);
//   const [isLogged, setIsLogged] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       fetch('/api/me', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//         .then(res => {
//           if (!res.ok) throw new Error('Token inválido');
//           return res.json();
//         })
//         .then(data => {
//           setUser(data);
//           setIsLogged(true);
//         })
//         .catch(() => {
//           localStorage.removeItem('token');
//           setUser(null);
//           setIsLogged(false);
//         });
//     }
//   }, []);

//   const login = async (email: string, password: string) => {
//     const res = await fetch('/api/login', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email, password }),
//     });

//     if (!res.ok) {
//       throw new Error('Login inválido');
//     }

//     const data = await res.json();
//     localStorage.setItem('token', data.token);
//     setUser(data.user);
//     setIsLogged(true);
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     setUser(null);
//     setIsLogged(false);
//   };

//   return (
//     <AuthContext.Provider value={{ user, isLogged, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }
