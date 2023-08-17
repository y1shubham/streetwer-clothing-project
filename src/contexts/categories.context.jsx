import { createContext, useState, useEffect } from 'react';

import { getCategoriesAnddocuments } from '../utils/firebase/firebase.utils.js';



export const CategoriesContext = createContext ({
    categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
    const [categoriesMap, setcategoriesMap] = useState([{}]);

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAnddocuments();
            
            setcategoriesMap(categoryMap);
        }
        getCategoriesMap();
    }, []); 
    
    
    const value = { categoriesMap };
    return (
        <CategoriesContext.Provider value = {value} > {children}</CategoriesContext.Provider>
    );
};