import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import { createAction } from "../../utils/reducer/reducer.utils";
import { CATEGORIES_ACTION_TYPES } from "./category.types";

export const fetchCategoriesStart = () => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, null)
export const fetchCategoriesSuccess = (categoriesArray: any) => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categoriesArray)
export const fetchCategoriesFailed = (error: any) => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error)

export const fetchCategoriesAsync = () => async (dispatch: any) => {
    dispatch(fetchCategoriesStart())
    try {
        const categoriesArray = await getCategoriesAndDocuments();
        dispatch(fetchCategoriesSuccess(categoriesArray))
    } catch (error: any) {
        dispatch(fetchCategoriesFailed(error))
    }
}