import React,{createContext,useContext,useState,useEffect, Children} from 'react'

const PageContext=createContext();
export const usePageContext=()=>{
    return useContext(PageContext);
};
export const PageProvider=({children})=>{
    const [currentPage,steCurrentPage]=useState(()=>{
        return localStorage.getItem('currentPage')||'/';
    });
    useEffect(()=>{
        localStorage.setItem('currentPage',currentPage);
    },[currentPage]);
    return(
        <PageContext.Provider value={{currentPage,steCurrentPage}}>
            {children}
        </PageContext.Provider>
    );
};