import { Card, Form, Alert, Button } from "react-bootstrap";
import { useState, useEffect } from 'react';
import { authenticateUser } from "../lib/authenticate";
import { getFavourites, getHistory } from "@/lib/userDate";
import { useRouter } from 'next/router';
import { useAtom } from "jotai";
import { searchHistoryAtom } from '@/store'
import { favouritesAtom } from '@/store'

export default function login(props) {
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
    const [warning, setWarning] = useState("");
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    async function updateAtoms() {
        setFavouritesList(await getFavourites());
        setSearchHistory(await getHistory());
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            await authenticateUser(user, password);
            await updateAtoms();
            router.push("/favourites");
        } catch (err) {
            setWarning(err.message);
        }

    }

    return (
        <>
            <Card bg="light">
                <Card.Body>
                    <h2>Login</h2>
                    Enter your login information below:
                </Card.Body>
            </Card>

            <br />

            <Form onSubmit={handleSubmit}>
                <Form.Group >
                    <Form.Label>User:</Form.Label>
                    <Form.Control type="text" value={user} id="userName" name="userName" onChange={e => setUser(e.target.value)} />
                </Form.Group>
                <br />
                <Form.Group>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" value={password} id="password" name="password" onChange={e => setPassword(e.target.value)} />
                </Form.Group  >


                {warning && <>
                    <br />
                    <Alert variant='danger'>
                        {warning}
                    </Alert>
                </>}

                <br />
                <Button variant="primary" className="pull-right" type="submit">Login</Button>
            </Form>
        </>
    );
}