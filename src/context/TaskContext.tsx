import { createContext, useContext, useState, ReactNode } from 'react';
import { Task, TaskCategory, TaskStatus, TaskPriority } from '../types/taskTypes';

interface TaskContextType {
    tasks: Task[];
    addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
    updateTask: (id: string, updatedTask: Partial<Task>) => void;
    deleteTask: (id: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
    const [tasks, setTasks] = useState<Task[]>(() => {
        // Initial mock tasks
        return [
            {
                id: '1',
                title: 'Task#1',
                description: 'Task',
                category: 'Documentation',
                status: 'In Progress',
                priority: 'High',
                createdAt: new Date(),
            },
            {
                id: '2',
                title: 'Task#2',
                description: 'Task',
                category: 'Feature',
                status: 'To Do',
                priority: 'Medium',
                createdAt: new Date(),
            },
        ];
    });

    const addTask = (task: Omit<Task, 'id' | 'createdAt'>) => {
        const newTask: Task = {
            ...task,
            id: Date.now().toString(),
            createdAt: new Date(),
        };
        setTasks([...tasks, newTask]);
    };

    const updateTask = (id: string, updatedTask: Partial<Task>) => {
        setTasks(
            tasks.map((task) => (task.id === id ? { ...task, ...updatedTask } : task))
        );
    };

    const deleteTask = (id: string) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };

    return (
        <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTasks = () => {
    const context = useContext(TaskContext);
    if (context === undefined) {
        throw new Error('useTasks must be used within a TaskProvider');
    }
    return context;
};