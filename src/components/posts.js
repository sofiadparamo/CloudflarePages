import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Card, Col, Row, Form, FloatingLabel, Button} from 'react-bootstrap'

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [username, setUsername] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const getPosts = async () => {
        axios.get("https://workers-1.sweetsofimc.workers.dev/posts").then(response => {
            const resp = response.data;
            if(!response.data){
                setPosts([{"title": "No posts avaliable", "id": 0}])
            } else{
                setPosts(resp);
            }
        });
    };

    getPosts();
  }, []);

  let handleSubmit = (event) => {
    let headers = {
        'content-type': 'application/json'
    }    
    let data = {
        "title": title,
        "username": username,
        "content": content
    }
    axios.post("https://workers-1.sweetsofimc.workers.dev/posts", JSON.stringify(data), {headers: headers}
    ).then(res => {
        console.log(res)
        if(res.data.status === "Success."){
            console.log("Reloading")
            window.location.reload(false);
        }
    }).catch(err => {
        console.log(err)
    })
  }

  return (
    <div>
      <div className="container mt-5">
          <Form>
              <h1>Publish a post</h1>
              <Row>
                  <Col md>
                    <FloatingLabel controlId="floatingInputGrid" label="Title">
                        <Form.Control type="text" placeholder="Title" onChange={(event) => setTitle(event.target.value)}/>
                    </FloatingLabel>
                  </Col>
                  <Col md>
                    <FloatingLabel controlId="floatingInputGrid" label="Username">
                        <Form.Control type="text" placeholder="Username" onChange={(event) => setUsername(event.target.value)}/>
                    </FloatingLabel>
                  </Col>
              </Row>
              <Row>
                  <Col md className="mt-3 mb-3">
                    <FloatingLabel controlId="floatingInputGrid" label="Content">
                        <Form.Control type="text" placeholder="Content" onChange={(event) => setContent(event.target.value)}/>
                    </FloatingLabel>
                  </Col>
              </Row>
              <Row>
                <Col md className="mb-3">
                    <Button variant="primary" onClick={handleSubmit}>
                        Publish
                    </Button>
                </Col>
              </Row>
          </Form>
      <h1>Posts</h1>
      {posts.map((post) => (
        <Card style={{ width: '100%' }} key={post.id}>
            <Card.Header>
                {post.username}
            </Card.Header>
            <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text >
                    {post.content}
                </Card.Text>
            </Card.Body>
        </Card>
      ))}
      </div>
    </div>
  );
};

export default Posts;