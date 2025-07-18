import React from 'react';
import { Task } from '../../types/taskTypes';
import { useNavigate } from 'react-router-dom';
import {
    Card,
    CardContent,
    Typography,
    Chip,
    Button,
    CardActions,
    Box,
} from '@mui/material';
import styles from './TaskItem.module.css';

interface TaskItemProps {
    task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
    const navigate = useNavigate();

    const getPriorityColor = () => {
        switch (task.priority) {
            case 'High':
                return 'error';
            case 'Medium':
                return 'warning';
            case 'Low':
                return 'success';
            default:
                return 'default';
        }
    };

    const getStatusColor = () => {
        switch (task.status) {
            case 'Done':
                return 'success';
            case 'In Progress':
                return 'info';
            case 'To Do':
                return 'default';
            default:
                return 'default';
        }
    };

    return (
        <Card className={styles.card}>
            <CardContent>
                <Typography variant="h6" component="div">
                    {task.title}
                </Typography>
                {task.description && (
                    <Typography variant="body2" color="text.secondary" mt={1}>
                        {task.description}
                    </Typography>
                )}
                <Box mt={2} display="flex" flexWrap="wrap" gap={1}>
                    <Chip label={task.category} size="small" />
                    <Chip label={task.status} size="small" color={getStatusColor()} />
                    <Chip label={task.priority} size="small" color={getPriorityColor()} />
                </Box>
            </CardContent>
            <CardActions>
                <Button
                    size="small"
                    onClick={() => navigate(`/task/${task.id}`)}
                >
                    Edit
                </Button>
            </CardActions>
        </Card>
    );
};

export default TaskItem;