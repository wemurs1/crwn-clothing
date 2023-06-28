import {
  ReactNode,
  createContext,
  useEffect,
  useReducer,
} from 'react';
import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils';
import { createAction } from '../utils/reducer/reducer.utils';

interface Props {
  children: ReactNode;
}

interface ActionProps {
  type: string;
  payload: any;
}

export const CategoriesContext = createContext({
  categoriesMap: {},
});

export const CATEGORIES_ACTION_TYPES = {
  SET_CATEGORIES: 'SET_CATEGORIES',
};

const INITIAL_STATE = {
  categoriesMap: {},
};

const categoriesReducer = (state: any, action: ActionProps) => {
  const { type, payload } = action;

  switch (type) {
    case CATEGORIES_ACTION_TYPES.SET_CATEGORIES:
      return {
        categoriesMap: payload,
      };

    default:
      throw new Error(`Unhandled type ${type} in userReducer`);
  }
};

export const CategoriesProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(categoriesReducer, INITIAL_STATE);

  const { categoriesMap } = state;

  const setCategoriesMap = (categoriesMap: any) => {
    dispatch(
      createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categoriesMap)
    );
  };

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      setCategoriesMap(categoryMap);
    };

    getCategoriesMap();
  }, []);

  const value = { categoriesMap };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
