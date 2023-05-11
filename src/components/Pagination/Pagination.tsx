/*eslint-disable*/
import React, { SetStateAction, useEffect, useState } from 'react';
import { useNavigate, NavigateFunction, useLocation } from 'react-router-dom';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import ProductCard from '../ProductCard/ProductCard';

function Items({ currentItems }: { currentItems: { name: string, image: string, oldPrice: number, sale: number, category: string, slug: string }[] }) {
    return (
        <>
            {currentItems &&
                currentItems.map((each, index) => (
                    <div className={`col-lg-3 col-md-4 col-sm-6 col-6`} key={index}>
                        <ProductCard image={each.image} oldPrice={each.oldPrice} sale={each.sale} name={each.name} category={each.category} slug={each.slug} />
                    </div>
                ))}
        </>
    );
}

export default function PaginatedItems({ itemsPerPage, queryAPI, currentPage, setCurrentPage }: { itemsPerPage: number, queryAPI: string, currentPage: number, setCurrentPage: React.Dispatch<SetStateAction<number>> }) {
    const navigate: NavigateFunction = useNavigate()
    let getAPI: string
    const local = localStorage.getItem('queryApi')
    if (local) {
        getAPI = queryAPI + JSON.parse(local)
    }
    else {
        getAPI = queryAPI
    }
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const queryString: number = parseInt(searchParams.get('page') || '1');
    const [prods, setProds] = useState<{ _id: string, name: string, description: string, oldPrice: number, sale: number, quantity: { color: string, size: { size: string, quantity: number }[] }[], image: string, imageSlideShows: string, category: string, type: string, slug: string }[]>([])
    // const [currentPage, setCurrentPage] = useState(queryString - 1);
    const itemOffset = currentPage * itemsPerPage;
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = prods?.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(prods?.length / itemsPerPage);

    const handlePageClick = (event: { selected: number }) => {
        const newPage = event.selected;
        // setCurrentPage(newPage);
        if (newPage === 0) {
            searchParams.delete('page')
            navigate(`?${searchParams.toString()}`)
        }
        else {
            searchParams.delete('page')
            searchParams.set('page', `${newPage + 1}`)
            navigate(`?${searchParams.toString()}`)
        }
        setCurrentPage(newPage);
    };

    const handlePopstate = (event: PopStateEvent) => {
        window.location.reload();
    };
    useEffect(() => {
        window.addEventListener('popstate', handlePopstate);
        return () => {
            window.removeEventListener('popstate', handlePopstate);
        };
    }, []);
    useEffect(() => {
        fetch(queryAPI)
            .then(res => res.json())
            .then(data => setProds(data.products))
    }, [queryAPI]);
    return (
        <>
            {/* Render items */}
            <Items currentItems={currentItems} />

            {/* Render pagination */}
            {pageCount > 0 && (
                <ReactPaginate
                    nextLabel=">"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    forcePage={currentPage}
                    previousLabel="<"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                />
            )}
        </>
    );
}
