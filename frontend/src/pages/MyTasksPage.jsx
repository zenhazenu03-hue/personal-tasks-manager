import React, { useState } from 'react';
import { Plus, MoreHorizontal, Calendar, Flag, CheckCircle2, Circle } from 'lucide-react';
import Header from '../components/Header';
import TaskModal from '../components/TaskModal';
import styles from '../styles/mytasks.module.css';
import layoutStyles from '../styles/layout.module.css';

const MyTasksPage = ({ tasks, onSaveTask, onDeleteTask, setActivePage, loading }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const handleEditTask = (task) => {
    setEditingTask({ ...task, id: task._id || task.id });
    setIsModalOpen(true);
  };

  const columns = [
    { id: 'todo', title: 'To Do', color: '#6366f1', icon: <Circle size={18} /> },
    { id: 'done', title: 'Completed', color: '#10b981', icon: <CheckCircle2 size={18} /> }
  ];

  return (
    <div className={layoutStyles.mainContent}>
      <Header 
        title="My Tasks" 
        onAddTask={() => { setEditingTask(null); setIsModalOpen(true); }} 
        onProfileClick={() => setActivePage('profile')}
      />
      
      <div className={styles.kanbanBoard}>
        {columns.map(column => {
          const columnTasks = tasks.filter(t => (t.status === column.id) || (!t.status && column.id === 'todo'));
          
          return (
            <div key={column.id} className={styles.kanbanColumn}>
              <div className={styles.columnHeader}>
                <div className={styles.columnTitle}>
                  <div className={styles.columnDot} style={{ backgroundColor: column.color, boxShadow: `0 0 0 4px ${column.color}20` }}></div>
                  {column.title}
                  <span className={styles.taskCount}>
                    {columnTasks.length}
                  </span>
                </div>
                <button style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                  <MoreHorizontal size={18} />
                </button>
              </div>
              
              <div className={styles.taskList}>
                {columnTasks.length === 0 ? (
                  <div className={styles.emptyIllustration}>
                    {column.icon}
                    <div className={styles.emptyIllustrationTitle}>No tasks in {column.title}</div>
                  </div>
                ) : (
                  columnTasks.map(task => (
                    <div key={task._id || task.id} className={styles.kanbanCard} onClick={() => handleEditTask(task)}>
                      <div className={styles.cardTitle}>{task.title}</div>
                      {task.description && <div className={styles.cardDesc}>{task.description}</div>}
                      
                      <div className={styles.cardFooter}>
                        <div className={styles.cardMeta}>
                          {task.date && task.date !== 'No Date' && (
                            <div className={styles.metaItem}>
                              <Calendar size={12} />
                              <span>{task.date}</span>
                            </div>
                          )}
                          {task.priority && task.priority !== 'none' && (
                            <div className={styles.metaItem}>
                              <Flag size={12} className={styles[`priority_${task.priority}`]} />
                              <span style={{ textTransform: 'capitalize' }}>{task.priority}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
                
                <button 
                  className={styles.emptyColumn}
                  onClick={() => {
                    setEditingTask({ status: column.id });
                    setIsModalOpen(true);
                  }}
                >
                  <Plus size={16} style={{ marginRight: '8px' }} />
                  Add task
                </button>
              </div>
            </div>
          );
        })}
      </div>

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

export default MyTasksPage;
