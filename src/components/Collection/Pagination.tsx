import React, { useEffect, useMemo, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { PRODUCT } from '../Detail/Detail';
import ProductCard from '../ProductCard/ProductCard';
import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom';

function Items({ currentItems }: { currentItems: PRODUCT[] }) {
    return (
        <>
            {currentItems &&
                currentItems.map((item, index) => (
                    <div className='col-lg-3' key={index}>
                        <ProductCard image={item.image} oldPrice={item.oldPrice} sale={item.sale} name={item.name} category={item.category} slug={item.slug} />
                    </div>
                ))}
        </>
    );
}

export default function PaginatedItems({ itemsPerPage, apiString }: { itemsPerPage: number, apiString: string }) {
    const navigate: NavigateFunction = useNavigate()
    const location = useLocation();
    const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
    const [prods, setProds] = useState<PRODUCT[]>([])
    const [itemOffset, setItemOffset] = useState(parseInt(searchParams.get("startItem") ?? "0", 10));

    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = prods.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(prods.length / itemsPerPage);

    // Invoke when user click to request another page.
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
            await fetch(apiString)
                .then(res => res.json())
                .then(all => setProds(all.products))
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