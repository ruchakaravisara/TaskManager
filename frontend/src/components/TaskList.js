import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button, Form, FormControl } from "react-bootstrap";
import axios from "axios";
import TaskForm from "./TaskForm";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await axios.get(`http://localhost:8080/tasks/${localStorage.getItem('id')}`,{
      headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
  });
    setTasks(response.data.data);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8080/tasks/${id}`,{
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
    });
    fetchTasks();
  };

  const handleEdit = (task) => {
    setCurrentTask(task);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setCurrentTask(null);
    fetchTasks();
  };

  // Filter tasks based on search term
  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2 className="">Task Management</h2>

      {/* Search and Add Task Controls */}
      <div className="d-flex justify-content-between mb-3">
        <Form inline>
          <FormControl
            type="text"
            placeholder="Search tasks..."
            className="mr-sm-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Form>
        <Button onClick={() => setShowForm(true)} variant="primary">
          Add Task
        </Button>
      </div>

      {/* Task Form */}
      {showForm && (
        <TaskForm currentTask={currentTask} onClose={handleCloseForm} />
      )}

      {/* Task Grid */}
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <Col key={task._id}>
              <Card
                className="mb-4 shadow border-0"
                style={{ borderRadius: "15px", overflow: "hidden" }}
              >
                <Card.Body
                  className="p-4"
                  style={{
                    background: "linear-gradient(to right, #f0f2f5, #ffffff)",
                  }}
                >
                  <Card.Title
                    className="text-center mb-3"
                    style={{
                      fontWeight: "700",
                      fontSize: "1.5rem",
                      color: "#343a40",
                      textTransform: "capitalize",
                    }}
                  >
                    {task.title}
                  </Card.Title>
                  <Card.Text
                    style={{
                      fontSize: "1rem",
                      color: "#6c757d",
                      lineHeight: "1.5",
                    }}
                  >
                    {task.description}
                  </Card.Text>
                  <Card.Text
                    className="text-center"
                    style={{
                      color: task.status ? "#28a745" : "#dc3545",
                      fontWeight: "600",
                      fontSize: "1.1rem",
                    }}
                  >
                    <strong>Status:</strong>{" "}
                    {task.status ? "Complete" : "Incomplete"}
                  </Card.Text>

                  <Row className="justify-content-center mt-4">
                    <Button
                      className="mx-2 mb-2"
                      style={{
                        width: "45%",
                        fontWeight: "600",
                        color: "#fff",
                        backgroundColor: "#17a2b8",
                        border: "none",
                      }}
                      onClick={() => handleEdit(task)}
                    >
                      Edit
                    </Button>
                    <Button
                      className="mx-2 mb-2"
                      style={{
                        width: "45%",
                        fontWeight: "600",
                        color: "#fff",
                        backgroundColor: "#dc3545",
                        border: "none",
                      }}
                      onClick={() => handleDelete(task._id)}
                    >
                      Delete
                    </Button>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <p className="text-center">No tasks found</p>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default TaskList;
