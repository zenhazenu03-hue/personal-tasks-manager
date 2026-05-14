import React, { useState, useEffect } from 'react';
import { Calendar, Flag, Bell, X } from 'lucide-react';
import styles from '../styles/modal.module.css';

const TaskModal = ({ isOpen, onClose, onSaveTask, editingTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  
  // New functional state
  const [status, setStatus] = useState('todo');
  const [priority, setPriority] = useState('none');
  const [date, setDate] = useState('Today');
  const [reminder, setReminder] = useState(false);

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title || '');
      setDescription(editingTask.description || '');
      setStatus(editingTask.status || 'todo');
      setPriority(editingTask.priority || 'none');
      setDate(editingTask.date || 'Today');
      setReminder(editingTask.reminder === 'Set');
    } else {
      setTitle('');
      setDescription('');
      setStatus('todo');
      setPriority('none');
      setDate('Today');
      setReminder(false);
    }
  }, [editingTask, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const cycleStatus = () => {
    const statuses = ['todo', 'in_progress', 'done'];
    const nextIndex = (statuses.indexOf(status) + 1) % statuses.length;
    setStatus(statuses[nextIndex]);
  };

  const cyclePriority = () => {
    const priorities = ['none', 'low', 'medium', 'high'];
    const nextIndex = (priorities.indexOf(priority) + 1) % priorities.length;
    setPriority(priorities[nextIndex]);
  };

  const cycleDate = () => {
    const dates = ['Today', 'Tomorrow', 'Next Week', 'No Date'];
    const nextIndex = (dates.indexOf(date) + 1) % dates.length;
    setDate(dates[nextIndex]);
  };

  const toggleReminder = () => {
    setReminder(!reminder);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSaveTask({
      ...(editingTask?._id && { _id: editingTask._id }),
      title: title.trim(),
      description: description.trim(),
      status: status,
      date: date,
      priority: priority !== 'none' ? priority : null,
      reminder: reminder ? 'Set' : null
    });
    
    // Reset state
    setTitle('');
    setDescription('');
    setStatus('todo');
    setPriority('none');
    setDate('Today');
    setReminder(false);
    onClose();
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <h2 className={styles.modalHeading}>{editingTask ? 'Edit Task' : 'Create New Task'}</h2>
          <div className={styles.modalHeader}>
            <input 
              type="text" 
              className={styles.taskTitleInput} 
              placeholder="Task name" 
              autoFocus 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <button type="button" className={styles.closeModalBtn} onClick={onClose}>
              <X size={20} />
            </button>
          </div>
          <div className={styles.modalBody}>
            <textarea 
              className={styles.taskDescInput} 
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            
            <div className={styles.taskOptions}>
              <button 
                type="button" 
                className={`${styles.taskOptionBtn} ${styles.statusBtn}`}
                onClick={cycleStatus}
              >
                <div className={`${styles.statusDot} ${styles['status_' + status]}`}></div>
                <span style={{ textTransform: 'capitalize' }}>
                  {status.replace('_', ' ')}
                </span>
              </button>
              <button 
                type="button" 
                className={`${styles.taskOptionBtn} ${date !== 'No Date' ? styles.activeCalendar : ''}`}
                onClick={cycleDate}
              >
                <Calendar size={16} />
                <span>{date}</span>
              </button>
              <button 
                type="button" 
                className={`${styles.taskOptionBtn} ${
                  priority === 'high' ? styles.activePriorityHigh : 
                  priority === 'medium' ? styles.activePriorityMedium : 
                  priority === 'low' ? styles.activePriorityLow : ''
                }`}
                onClick={cyclePriority}
              >
                <Flag size={16} />
                <span style={{ textTransform: 'capitalize' }}>
                  {priority === 'none' ? 'Priority' : priority}
                </span>
              </button>
              <button 
                type="button" 
                className={`${styles.taskOptionBtn} ${reminder ? styles.activeReminder : ''}`}
                onClick={toggleReminder}
              >
                <Bell size={16} />
                <span>{reminder ? 'Reminder On' : 'Reminder'}</span>
              </button>
            </div>
          </div>
          <div className={styles.modalFooter}>
            <button type="button" className={styles.cancelBtn} onClick={onClose}>Cancel</button>
            <button type="submit" className={styles.addTaskSubmitBtn} disabled={!title.trim()}>
              {editingTask ? 'Save Changes' : 'Add Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
