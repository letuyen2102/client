import React, { useEffect, useMemo, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { PRODUCT } from '../Detail/Detail';
import ProductCard from '../ProductCard/ProductCard';
import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom';
import Loader from '../loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { hideLoader, showLoader } from '../../slices/loaderSlice';

function Items({ currentItems }: { currentItems: PRODUCT[] }) {
    return (
        <>

            {currentItems &&
                currentItems.map((item, index) => (
                    <div className='col-lg-3 col-md-3 col-sm-4 col-6' key={index}>
                        <ProductCard image={item.image} oldPrice={item.oldPrice} sale={item.sale} name={item.name} category={item.category} slug={item.slug} />
                    </div>
                ))}



        </>
    );
}

export default function PaginatedItems({ itemsPerPage, apiString }: { itemsPerPage: number, apiString: string }) {
    const navigate: NavigateFunction = useNavigate()
    const location = useLocation();
    const dispatch = useDispatch()
    const handleLoader = useSelector((state: RootState) => state.loader)
    const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
    const [prods, setProds] = useState<PRODUCT[]>([])
    const [itemOffset, setItemOffset] = useState(parseInt(searchParams.get("startItem") ?? "0", 10));

    const endOffset = itemOffset + itemsPerPage;
    const currentItems = prods.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(prods.length / itemsPerPage);

    const handlePageClick = (event: { selected: number }) => {

        const newOffset = (event.selected * itemsPerPage) % prods.length;
        if (event.selected === 0) {
            searchParams.delete("startItem")
        }
        else {

            searchParams.set("startItem", newOffset.toString())
        }
        navigate(`?${searchParams.toString()}`)
        setItemOffset(newOffset);
    };
    useEffect(() => {
        const getProds = async () => {
            dispatch(hideLoader())
            await fetch(apiString)
                .then(res => res.json())
                .then(all => setProds(all.products))
            dispatch(showLoader())
        }
        getProds()
    }, [apiString])
    useEffect(() => {
        if (!searchParams.get("startItem")) {
            setItemOffset(0)
        }
    }, [searchParams])
    return (
        <>
            {handleLoader.loader && <Loader />}
            <Items currentItems={currentItems} />
            <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={pageCount}
                forcePage={(itemOffset / itemsPerPage)}
                previousLabel="<"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
            />
        </>
    );
}