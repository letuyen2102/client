import { Button, Card, CardBody, CardFooter, Heading, Image, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const SearchCard: React.FC<{ image: string, name: string, slug: string }> = (props) => {
    return (
        <div className='row'>
            <div className='col-lg-2 col-md-2 col-sm-2 col-2'>
                <Image
                    // borderRadius='full'
                    src={props.image}
                    alt={props.name}
                />
            </div>
            <div className='col-lg-10 col-md-10 col-sm-10 col-10'>
                <a href={`/detail/${props.slug}`}>{props.name}</a>
            </div>
        </div>
    )
}

export default SearchCard