import React from 'react';
import { Calendar, MoreHorizontal, Edit2, Trash2 } from 'lucide-react';
import styles from '../styles/inbox.module.css';

const InboxList = ({ tasks, onDeleteTask }) => {
  return (
    <div className={styles.inboxListContainer}>
      <h2 className={styles.inboxHeader}>Inbox</h2>
      <div className={styles.inboxTasks}>
        {tasks.map(task => (
          <div key={task.id} className={styles.inboxTaskRow}>
            <div className={styles.taskCheckbox} onClick={() => onDeleteTask(task.id)}></div>
            <div className={styles.inboxTaskContent}>
              <div className={styles.inboxTaskTitle}>{task.title}</div>
              {task.description && (
                <div className={styles.inboxTaskDesc}>{task.description}</div>
              )}
              <div className={styles.inboxTaskMeta} style={{ marginTop: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--primary-color)' }}>
                  <Calendar size={12} />
                  <span>{task.date}</span>
                </div>
                {task.priority && (
                  <div style={{ textTransform: 'capitalize', color: 'var(--text-muted)' }}>
                    Priority: {task.priority}
                  </div>
                )}
                {task.reminder && (
                  <div style={{ color: 'var(--text-muted)' }}>
                    Reminder: {task.reminder}
                  </div>
                )}
              </div>
            </div>
            <div className={styles.inboxTaskActions}>
              <button className={styles.actionBtn} onClick={() => onEditTask(task)}>
                <Edit2 size={16} />
              </button>
              <button className={styles.actionBtn} onClick={() => onDeleteTask(task.id)}>
                <Trash2 size={16} />
              </button>
              <button className={styles.actionBtn} onClick={() => onDuplicateTask(task)}>
                <MoreHorizontal size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InboxList;
