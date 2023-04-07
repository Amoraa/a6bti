import React from 'react'
import useSWR from 'swr';
import Card from 'react-bootstrap/Card';
import Error from 'next/error';
import { Button } from 'react-bootstrap';
import { useAtom } from "jotai";
import { favouritesAtom } from '../store'
import { useState } from 'react'
import { addToFavourites, removeFromFavourites } from '../lib/userDate';
import { useEffect } from 'react';

export default function ArtworkCardDetail(props) {
    const { data, error } = useSWR(props.objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.objectID}` : null);
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
    const [showAdded, setAdded] = useState(false)

    useEffect(()=>{
        setAdded(favouritesList?.includes(props.objectID))
       }, [favouritesList])

     if (!data) return 'Loading...'

    async function favouritesClicked()
    {
        if (showAdded)
        {
            setFavouritesList(await removeFromFavourites(props.objectID))
            setAdded(false)
        }
        else
        {
            setFavouritesList(await addToFavourites(props.objectID))
            setAdded(true)

        }
    }

   
    if (data == null || data == undefined) {
        return null
    }
    else
        return (
            <Card >
                {(data.primaryImage != undefined) ? <Card.Img variant="top" src={data.primaryImage} /> : ''}

                <Card.Body>
                    <Card.Title> <h5>{data.title}</h5></Card.Title>
                    <Card.Text>
                        <p><b>Date:</b> {(data.objectDate ) ? data.objectDate : "N/A"}<br></br>
                        <b>Classification:</b> {(data.classification ) ? data.classification : "N/A"}<br></br>
                        <b>Medium:</b> {(data.medium ) ? data.medium : "N/A"}<br></br><br></br>
                        <b>Artist:</b> {(data.artistDisplayName ) ? <>{data.artistDisplayName} <a href={data.artistWikidata_URL} target="_blank" rel="noreferrer" >wiki</a></> : "N/A"}<br></br>
                        <b>Credit Line:</b> {(data.creditLine ) ? data.creditLine : "N/A"}<br></br>
                        <b>Dimensions:</b> {(data.dimensions) ? data.dimensions : "N/A"}</p>
                        <Button variant={showAdded?"primary":"outlineprimary"} onClick={() =>favouritesClicked()}>{showAdded?"Favourite (added)":"+ Favourite"} </Button>
                    </Card.Text>
                   
                </Card.Body>
            </Card>
        )
}
