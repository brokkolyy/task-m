import React from 'react';
import { useTasks } from '../../context/TaskContext';
import TaskItem from '../TaskItem/TaskItem';
import { Grid, Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styles from './TaskList.module.css';

const TaskList: React.FC = () => {
    const { tasks } = useTasks();
    const navigate = useNavigate();

    return (
        <Box className={styles.container}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Task Manager
                </Typography>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => navigate('/add-task')}
                >
                    Add Task
                </Button>
            </Box>
            {tasks.length === 0 ? (
                <Typography variant="body1">No tasks found</Typography>
            ) : (
                <Grid container spacing={3}>
                    {tasks.map((task) => (
                        <Grid item key={task.id} xs={12} sm={6} md={4} lg={3}>
                            <TaskItem task={task} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
};

export default TaskList;