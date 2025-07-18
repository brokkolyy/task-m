import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import TaskList from './components/TaskList/TaskList';
import TaskDetailsPage from './pages/TaskDetailsPage';
import AddTaskPage from './pages/AddTaskPage';
import { CssBaseline, Container } from '@mui/material';

function App() {
    return (
        <TaskProvider>
            <CssBaseline />
            <Router>
                <Container maxWidth="lg" sx={{ py: 4 }}>
                    <Routes>
                        <Route path="/" element={<TaskList />} />
                        <Route path="/task/:id" element={<TaskDetailsPage />} />
                         <Route path="/add-task" element={<AddTaskPage />} />
                    </Routes>
                </Container>
            </Router>
        </TaskProvider>
    );
}

export default App;