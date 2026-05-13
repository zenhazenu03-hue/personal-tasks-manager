import React, { useState, useEffect } from 'react';
import { Inbox, Plus } from 'lucide-react';
import Header from '../components/Header';
import TaskModal from '../components/TaskModal';
import InboxList from '../components/InboxList';
import inboxStyles from '../styles/inbox.module.css';
import layoutStyles from '../styles/layout.module.css';

const InboxPage = ({ tasks, onSaveTask, onDeleteTask, setActivePage, loading }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'd') {
        e.preventDefault();
        setEditingTask(null);
        setIsModalOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleDuplicateTask = (task) => {
    const duplicate = {
      ...task,
      id: null, // Clear ID for a new task
      title: `${task.title} (Copy)`
    };
    onSaveTask(duplicate);
  };

  const handleEditTask = (task) => {
    setEditingTask({ ...task, id: task._id || task.id });
    setIsModalOpen(true);
  };

  const handleDuplicateTask = (task) => {
    const duplicate = {
      ...task,
      id: Date.now(),
      title: `${task.title} (Copy)`
    };
    setTasks((prevTasks) => {
      const taskIndex = prevTasks.findIndex(t => t.id === task.id);
      const newTasks = [...prevTasks];
      newTasks.splice(taskIndex + 1, 0, duplicate);
      return newTasks;
    });
  };

  return (
    <div className={layoutStyles.mainContent}>
      <Header 
        title="Inbox" 
        onAddTask={() => { setEditingTask(null); setIsModalOpen(true); }} 
        onProfileClick={() => setActivePage('profile')}
      />
      
      {tasks.length === 0 ? (
        <div className={inboxStyles.emptyStateContainer}>
          <div className={inboxStyles.emptyStateIconWrapper}>
            <Inbox size={48} className={inboxStyles.emptyStateIcon} strokeWidth={1.5} />
          </div>
          <h2 className={inboxStyles.emptyStateTitle}>Your workspace is empty</h2>
          <p className={inboxStyles.emptyStateSubtitle}>There are no tasks here yet. Start by creating a new task to organize your work.</p>
          <button className={inboxStyles.emptyStateAddBtn} onClick={() => { setEditingTask(null); setIsModalOpen(true); }}>
            <Plus size={18} />
            Add Task
          </button>
        </div>
      ) : (
        <InboxList 
          tasks={tasks} 
          onDeleteTask={onDeleteTask}
          onEditTask={handleEditTask}
          onDuplicateTask={handleDuplicateTask}
        />
      )}
      
      <TaskModal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(null);
        }} 
        onSaveTask={onSaveTask}
        editingTask={editingTask}
      />
    </div>
  );
};

export default InboxPage;
