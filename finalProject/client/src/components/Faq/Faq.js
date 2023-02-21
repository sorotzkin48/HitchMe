import { React, useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import './Faq.css';

export default function Faq() {

  const [faqs, setFaqs] = useState([])

  let counter = 0;
  useEffect(() => {
    fetch(`http://localhost:8080/api/faq`)
      .then(faqs2 => faqs2.json())
      .then(faqs2 => {
        if (!faqs2[0]) {
          throw ("there aren't any faqs");
        }
        else {
          setFaqs(faqs2)
        }
      })
  }, [])


  return (
    <Accordion className="accordion">
      {faqs && faqs.map(item => {
        return (
          <Accordion.Item eventKey={counter++} key={item.faqId}>
            <Accordion.Header>{item.q}</Accordion.Header>
            <Accordion.Body> {item.a} </Accordion.Body>
          </Accordion.Item>)
      })}
    </Accordion>
  );
}

