import React, { useEffect } from 'react'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Error from 'next/error'
import { Card, Row, Col  } from 'react-bootstrap'
import Pagination from 'react-bootstrap/Pagination';
import useSWR from 'swr';
import ArtworkCard from '@/components/ArtworkCard'
import validObjectIDList from '@/public/data/validObjectIDList.json'


const PER_PAGE = 12

export default function index() {
    const [artworkList, setArtworkList] = useState([])
    const [page, setPage] = useState(1)

    const router = useRouter();
    let finalQuery = router.asPath.split('?')[1];

    const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`);
   
    function previousPage() {
        setPage(page => page - 1)
    }

    function nextPage() {
        setPage(page => page + 1)
    }
    if (error) {
        return <Error statusCode={404} />
    } 
    
    useEffect(() => {

        

        if (data != null && data != undefined) {
            let filteredResults = validObjectIDList.objectIDs.filter(x => data.objectIDs?.includes(x));

            var results = []
            for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
                const chunk = filteredResults.slice(i, i + PER_PAGE);
                results.push(chunk);
               }
               
            setArtworkList(results);

        }
        setPage(1)
    },[data])

    if (!data) return 'Loading...'

    if (data==null || data==undefined)
    {   
      return null
    }
    else{
       
        return (
            <>
                <Row className="gy-4">
                    {artworkList.length > 0 ? artworkList[page - 1].map((artwork) => (<Col lg={3} key={artwork}><ArtworkCard objectID={artwork} button/></Col>)) :
                        <Card><h4>Nothing Here</h4>Try searching for something else</Card>}
                </Row><br></br>
                {artworkList.length > 1?<Pagination>
                   
                    <Pagination.Prev onClick={previousPage}/>
                    <Pagination.Item>{page}</Pagination.Item>
                    <Pagination.Next onClick={nextPage}/>
                   
                </Pagination>: ''}
                
            </>)
    }
}
