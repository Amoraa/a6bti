import React from 'react'
import { useAtom } from "jotai";
import { favouritesAtom } from '@/store'
import { Row, Card, Col } from 'react-bootstrap';
import ArtworkCard from '@/components/ArtworkCard';

export default function Favourites() {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  if(!favouritesList) return null;



  return (
    <>
      <Row className="gy-4">
        {favouritesList.length > 0 ? favouritesList.map((artwork) => (<Col lg={3} key={artwork}><ArtworkCard objectID={artwork}  /></Col>)) :
          <Card><h4>Nothing Here</h4>Try adding some new artwork to the list.
          </Card>}
      </Row>


    </>)
}

