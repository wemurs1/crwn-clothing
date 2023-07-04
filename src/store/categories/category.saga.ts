import { takeLatest, all, call, put } from 'redux-saga/effects'
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import { fetchCategoriesFailed, fetchCategoriesSuccess } from './category.action';
import { CATEGORIES_ACTION_TYPES } from './category.types';
import { DocumentData } from 'firebase/firestore';

export function* fetchCategoriesAsync() {
    try {
        const categoriesArray: DocumentData = yield call(getCategoriesAndDocuments, 'categories');
        
        yield put(fetchCategoriesSuccess(categoriesArray));
    } catch (error: any) {
        yield put(fetchCategoriesFailed(error));
    }
}

export function* onFetchCategories() {
    yield takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync)
}

export function* categoriesSaga() {
    yield all([call(onFetchCategories)]);
}