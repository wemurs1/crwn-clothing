import { User } from 'firebase/auth';
import { ReactNode, createContext, useEffect, useState } from 'react';
import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
} from '../utils/firebase/firebase.utils';

interface Props {
  children: ReactNode;
}

interface ContextProps {
  currentUser: User | null;
  setCurrentUser: (value: User | null) => void;
}

export const UserContext = createContext<ContextProps>({
  currentUser: null,
  setCurrentUser: (value: User | null) => null,
});

export const UserProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) createUserDocumentFromAuth(user);

      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
