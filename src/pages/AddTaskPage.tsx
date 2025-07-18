import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';
import { TaskCategory, TaskStatus, TaskPriority } from '../types/taskTypes';
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

const AddTaskPage: React.FC = () => {
    const { addTask } = useTasks();
    const navigate = useNavigate();
    const [newTask, setNewTask] = useState<Omit<Task, 'id' | 'createdAt'>>({
        title: '',
        description: '',
        category: 'Feature',
        status: 'To Do',
        priority: 'Medium',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
        const { name, value } = e.target;
        setNewTask({
            ...newTask,
            [name as string]: value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addTask(newTask);
        navigate('/');
    };

    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Add New Task
            </Typography>
            <Paper sx={{ p: 3 }}>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Title"
                        name="title"
                        value={newTask.title}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />
                    <TextField
                        fullWidth
                        label="Description"
                        name="description"
                        value={newTask.description}
                        onChange={handleChange}
                        margin="normal"
                        multiline
                        rows={4}
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Category</InputLabel>
                        <Select
                            name="category"
                            value={newTask.category}
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
                            value={newTask.status}
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
                            value={newTask.priority}
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
                            Add Task
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Box>
    );
};

export default AddTaskPage;