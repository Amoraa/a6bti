import { useAtom } from 'jotai';
import { likedListAtom } from '../store';
import { useRouter } from 'next/router'
import { Card, Row, Col } from 'react-bootstrap'
import ArtworkCard from '@/components/ArtworkCard';
import Button from 'react-bootstrap';

export default function Like() {
  const [likedList, setLikedList] = useAtom(likedListAtom);
  const router = useRouter(); 

  function remove(artwork) {
    setLikedList((likedList) => {
      for (var i = 0; i < likedList.length; i++) {

        if (likedList[i] === artwork) {
         
          likedList.splice(i, 1);
        }

      }
      if (likedList.length == 0) {
        likedList = []
      }
     
      return likedList
    }

    );
    router.push(`/like`)
  }

  return (
    <>
      <Row className="gy-4">
        {likedList.length > 0 ? likedList.map((artwork) => (<Col lg={3} key={artwork}><ArtworkCard objectID={artwork} delete /><br></br> <button className='btn btn-danger' onClick={e => remove(artwork)}>Remove</button> </Col>)) :
          <Card><h4>Nothing Here</h4>You did not add any Liked artworks</Card>}

      </Row><br></br>

    </>
  )
}
