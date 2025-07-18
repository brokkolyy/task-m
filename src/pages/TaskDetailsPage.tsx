import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';
import { Task, TaskCategory, TaskStatus, TaskPriority } from '../types/taskTypes';
import {
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Button,
    Box,
    Typography,
    Paper,
} from '@mui/material';

const TaskDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { tasks, updateTask } = useTasks();
    const navigate = useNavigate();
    const [task, setTask] = useState<Task | null>(null);

    useEffect(() => {
        const foundTask = tasks.find((t) => t.id === id);
        if (foundTask) {
            setTask(foundTask);
        } else {
            navigate('/');
        }
    }, [id, tasks, navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
        if (!task) return;

        const { name, value } = e.target;
        setTask({
            ...task,
            [name as string]: value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (task) {
            updateTask(task.id, task);
            navigate('/');
        }
    };

    if (!task) return null;

    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Edit Task
            </Typography>
            <Paper sx={{ p: 3 }}>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Title"
                        name="title"
                        value={task.title}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />
                    <TextField
                        fullWidth
                        label="Description"
                        name="description"
                        value={task.description || ''}
                        onChange={handleChange}
                        margin="normal"
                        multiline
                        rows={4}
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Category</InputLabel>
                        <Select
                            name="category"
                            value={task.category}
                            onChange={handleChange}
                            label="Category"
                        >
                            {['Feature', 'Documentation', 'Test'].map((cat) => (
                                <MenuItem key={cat} value={cat}>
                                    {cat}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Status</InputLabel>
                        <Select
                            name="status"
                            value={task.status}
                            onChange={handleChange}
                            label="Status"
                        >
                            {['To Do', 'In Progress', 'Done'].map((status) => (
                                <MenuItem key={status} value={status}>
                                    {status}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Priority</InputLabel>
                        <Select
                            name="priority"
                            value={task.priority}
                            onChange={handleChange}
                            label="Priority"
                        >
                            {['Low', 'Medium', 'High'].map((priority) => (
                                <MenuItem key={priority} value={priority}>
                                    {priority}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                        <Button variant="outlined" onClick={() => navigate('/')}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="contained" color="primary">
                            Save
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Box>
    );
};

export default TaskDetailsPage;