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
    const { _id, createdAt, __v, ...rest } = task;
    onSaveTask({
      ...rest,
      title: `${task.title} (Copy)`
    });
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
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
