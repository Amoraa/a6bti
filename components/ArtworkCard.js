import React from 'react'
import useSWR from 'swr';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import Error from 'next/error';
import { useAtom } from "jotai";
import { likedListAtom } from '@/store'



export default function ArtworkCard(props) {
  const [likedList, setLikedList] = useAtom(likedListAtom);


  const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.objectID}`);
  if (error) return <Error statusCode={404} />
  if (!data) return 'Loading...'



  function addToLiked(artwork) {
    if (!likedList.includes(artwork))
    {
        setLikedList([...likedList, artwork]);
    }
    
  }



  if (data == null || data == undefined) {
    return null
  }
  else

    return (
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={(data.primaryImageSmall) ? data.primaryImageSmall : 'https://via.placeholder.com/375x375.png?text=[+Not+Available+]'} />
        <Card.Body>
          <Card.Title> {data.title}</Card.Title>
          <Card.Text>
            <b>Date:</b> {(data.objectDate) ? data.objectDate : "N/A"}<br></br>
            <b>Classification:</b> {(data.classification) ? data.classification : "N/A"}<br></br>
            <b>Medium:</b> {(data.medium) ? data.medium : "N/A"}

          </Card.Text>
          <Link passHref href={`/artwork/${props.objectID}`}><Button variant="primary"><b>ID: </b>{props.objectID}</Button></Link>&nbsp;&nbsp;
          {props.button ? <Button variant="primary" onClick={e => addToLiked(props.objectID)}>Add to Liked</Button> : ""}
         
        </Card.Body>
      </Card>
    )
}
