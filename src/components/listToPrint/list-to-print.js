import React from "react";
import { useState } from "react";
import {
  BsFillArrowDownCircleFill,
  BsFillArrowUpCircleFill,
  BsFillPlusCircleFill,
  BsFillFileExcelFill,
} from "react-icons/bs";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { v4 as uuidv4 } from "uuid";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const ListToPrint = React.forwardRef((props, ref) => {
  const [items, setItems] = useState([]);

  const [inputValue, setInputValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("");

  //ADD item to the list
  const addItem = () => {
    const newItem = {
      itemName: inputValue,
      id: uuidv4(),
      quantity: 1,
      isSelected: false,
      category: categoryValue,
    };

    const newItems = [...items, newItem];

    setItems(newItems);
    setInputValue("");
    setCategoryValue("");
  };

  //REMOVE item from list
  const removeItem = (itemName) => {
    const newItems = items.filter((item) => item.itemName !== itemName);

    setItems(newItems);
  };

  //INCREASE item count
  const increaseAmount = (index) => {
    const newItems = [...items];

    newItems[index].quantity++;

    setItems(newItems);
  };

  //DECREASE item count
  const decreaseAmount = (index) => {
    const newItems = [...items];

    newItems[index].quantity--;

    setItems(newItems);

    if (index.quatity < 1) removeItem();
  };

  return (
    <>
      <Col>
        <Form>
          <Row>
            <Form.Group className="add-item-box">
              <Form.Label>Add an Item to Your List!</Form.Label>
              <Row>
                <Col>
                  <Form>
                    <Form.Control
                      className="add-item-input"
                      placeholder="Item"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                    />
                    <Form.Control
                      className="add-item-category"
                      placeholder="Where to find it"
                      value={categoryValue}
                      onChange={(e) => setCategoryValue(e.target.value)}
                    />
                    <Button
                      variant="success"
                      className="add-button"
                      onClick={() => addItem()}
                    >
                      <BsFillPlusCircleFill />
                    </Button>
                  </Form>
                </Col>
              </Row>
            </Form.Group>
          </Row>
        </Form>
      </Col>
      <div ref={ref}>
        <div className="item-list">
          <Row>
            {items.map((item, index) => (
              <Card key={item.id} className="item-container">
                <Card.Title className="item-name">
                  {item.itemName}
                  <Button
                    className="remove"
                    variant="danger"
                    onClick={() => removeItem(item.itemName)}
                  >
                    <BsFillFileExcelFill />
                  </Button>
                </Card.Title>
                <Col>
                  <Card.Text>{item.category}</Card.Text>
                  <Card.Body className="quantity">
                    <Card.Text>We need: {item.quantity} </Card.Text>
                    <Button
                      className="increase"
                      onClick={() => increaseAmount(index)}
                    >
                      <BsFillArrowUpCircleFill />
                    </Button>
                    <Button
                      className="decrease"
                      onClick={() => decreaseAmount(index)}
                    >
                      <BsFillArrowDownCircleFill />
                    </Button>
                  </Card.Body>
                </Col>
              </Card>
            ))}
          </Row>
        </div>
      </div>
    </>
  );
});
