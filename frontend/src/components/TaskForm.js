// src/components/TaskForm.js
import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

const TaskForm = ({ currentTask, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(false);

  useEffect(() => {
    if (currentTask) {
      setTitle(currentTask.title);
      setDescription(currentTask.description);
      setStatus(currentTask.status);
    } else {
      setTitle("");
      setDescription("");
      setStatus(false);
    }
  }, [currentTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const taskData = { title, description, status };

    if (currentTask) {
      // Update task
      await axios.put(
        `http://localhost:8080/tasks/${currentTask._id}`,
        taskData
      );
    } else {
      // Create new task
      await axios.post("http://localhost:8080/tasks", taskData);
    }

    onClose();
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{currentTask ? "Edit Task" : "Add Task"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formStatus">
            <Form.Check
              type="checkbox"
              label="Complete"
              checked={status}
              onChange={(e) => setStatus(e.target.checked)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            {currentTask ? "Update Task" : "Create Task"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default TaskForm;
